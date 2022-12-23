import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { observable } from 'rxjs';
import { Category } from 'src/app/Models/category';
import { Products, ProductsWithCategories } from 'src/app/Models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {
   isupdatebtncall:boolean=false;
   isdisabledbtncall:boolean=false;
   isenabledbtncall:boolean=false;
   isdeletebtncall:boolean=false;
   isavaliable=true;

  spinnerbtn:boolean=false;
  //  productid for delete
   productid:number=0;

   confirmationmsg:string='';
  //  products:Products[]=[];
   product:Products;
   productswithcates:ProductsWithCategories[]=[];
   productswithcate:ProductsWithCategories;
   categories:Category[]=[];
   category:Category;
   categorylist:string[]=[];


  addproductform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
    choosecategory: new FormControl('', [Validators.required]),
    productimg: new FormControl('', [Validators.required]),
  });

  constructor(private itemservice:ItemsService,private categoryservice:CategoryService) { }

  ngOnInit(): void {
    this.categoryservice.getAllcategories().subscribe(data=>{
      this.categories=data;
      for(let cat of data){ 
        this.categorylist.push(cat.name)
        for(let pro of cat.products){
          this.productswithcate=pro;
          this.productswithcate.category=cat;
          this.productswithcates.push(this.productswithcate);
        }
      }
    })
  }
  addproductcall(){
    this.isupdatebtncall=false;
    this.choosecategory.enable();
    this.addproductform.reset();
  }
  confirmAdd(){
    this.spinnerbtn=true;
    this.choosecategory.enable();
    let product=new Products(this.name.value,+this.price.value,this.desc.value,true,this.productimg.value);
    // let formData=new FormData();
    // formData.append('product',JSON.stringify(product));
    // formData.append('file',this.imgUrl);
    // console.log(JSON.stringify(product));

    
      this.itemservice.addproduct(+this.choosecategory.value,product).subscribe(data=>{
        console.log(data);
        this.spinnerbtn=false;
        alert("Cuisine Added Successful");
       this.categories.map(category=>{
         if(category.id===+this.choosecategory.value){
           this.category=category;
           console.log(this.productswithcate.category);
         }
       });
        this.productswithcate= data;
        this.productswithcate.category=this.category;
        this.productswithcates.push(this.productswithcate);
        this.addproductform.reset();
      },error=>{
        this.spinnerbtn=false;
        alert("Something went Wrong please try Again");
      })
    


    
  }
  deleteproductcall(id:number){
    this.isdeletebtncall=true;
    this.isupdatebtncall=false;
    this.isdisabledbtncall=false;
    this.isenabledbtncall=false;

    this.productid=id;
    this.confirmationmsg="delete";
    
  }
  confirmremove(){
    console.log(this.productid);
    this.spinnerbtn=true;
    this.itemservice.deleteproduct(this.productid).subscribe(data=>{
      console.log(data);
      if(data){
        alert("Item Deleted Successfully");
        for(let [i,value] of this.productswithcates.entries()){
          if(value.id===this.productid){
            this.spinnerbtn=false;
            this.productswithcates.splice(i);
            document.getElementById("closebutton").click();
            break;
          }
        }
      }else{
        this.spinnerbtn=false;
        alert("Something went wrong please try again...  ");
      }
    });
  }
  
  updateproductcall(product:ProductsWithCategories,categoryID:number){
    this.isupdatebtncall=true;
    this.isdeletebtncall=false;
    this.isdisabledbtncall=false;
    this.isenabledbtncall=false;
    this.confirmationmsg="update";

    this.productid=product.id;
    this.product=product;
    this.name.setValue(product.name);
    this.price.setValue(product.price.toString());
    this.desc.setValue(product.desc);
    this.choosecategory.setValue(categoryID.toString());
    this.choosecategory.disable();
    this.productimg.setValue(product.imgurl);
  }
  confirmUpdate(){
    this.spinnerbtn=true;
    let product=new Products(this.name.value,+this.price.value,this.desc.value,this.product.isavailable,this.productimg.value);

    
    if(this.isupdatebtncall){
      this.itemservice.upadateproduct(product,this.productid).subscribe(status=>{
        this.spinnerbtn=false;
        alert("Cuisine Updated Succesfully");
       this.productswithcates.filter(items=>{
          if(items.id===this.productid){
            items.name=product.name;
            items.price=product.price;
            document.getElementById("closebutton").click();
          }
        },error=>{
          this.spinnerbtn=false;
          alert("Something went wrong.....")
        });
      });
    }
  }
  disabledproductcall(product:Products){
    this.isupdatebtncall=false;
    this.isdeletebtncall=false;
    this.isdisabledbtncall=true;
    this.isenabledbtncall=false;
    this.isavaliable=false;
    this.confirmationmsg="Disabled";

    this.product=product;
  }
  enabledproductcall(product:Products){
    this.isupdatebtncall=false;
    this.isdeletebtncall=false;
    this.isdisabledbtncall=false;
    this.isenabledbtncall=true;
    this.isavaliable=true;
    this.confirmationmsg="Enabled";

    this.product=product;
  }

  confirmEnabledORDisabled(){
    this.spinnerbtn=true;
   this.product.isavailable=!this.product.isavailable;
   let product=new Products(this.product.name,+this.product.price,this.desc.value,this.product.isavailable,this.product.imgurl);
   console.log(this.product.id);
   
   if(this.isavaliable){
      this.itemservice.upadateproduct(product,this.product.id).subscribe(status=>{
        this.spinnerbtn=false;
        alert("Item is Enabled Now");
       this.productswithcates.filter(items=>{
          if(items.id===this.product.id){
           items.isavailable=true;
            document.getElementById("closebutton").click();
          }
        });
      });
    }else{
      this.itemservice.upadateproduct(product,this.product.id).subscribe(status=>{

        this.spinnerbtn=false;
        alert("Item is Disabled Now");
       this.productswithcates.filter(items=>{
          if(items.id===this.product.id){
           items.isavailable=false;
            document.getElementById("closebutton").click();
          }
        });
      });

    }
  }
  get name() {
    return this.addproductform.get('name');
  }
  get price() {
    return this.addproductform.get('price');
  }
  get desc() {
    return this.addproductform.get('desc');
  }
  get choosecategory() {
    return this.addproductform.get('choosecategory');
  }
  get productimg() {
    return this.addproductform.get('productimg');
  }

}
