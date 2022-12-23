import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/Models/cart';
import { Products } from 'src/app/Models/product';
import { AuthService } from 'src/app/services/AuthService.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  usercart:Cart;
  products: Products[] = [];

  constructor(public authser:AuthService,private cartservice:CartService) { }

  ngOnInit(): void {
    this.usercart=JSON.parse(localStorage.getItem('usercart'));
    if (this.usercart!=null) {
      this.products = this.usercart.products;
    }
    
  }

  addqty(product:Products) {
    this.cartservice.addqty(product.id);
    product.qty++;
    this.usercart.totalamount+=product.price;
      this.cartservice.updateusercart();

  }
  rmvqty(product:Products) {

    this.cartservice.rmvqty(product.id);

    if(product.qty > 1){
      product.qty--;
      this.usercart.totalamount-=product.price;
      this.cartservice.updateusercart();
     
    }else{
      if(this.products.length===0){
        let user=JSON.parse(localStorage.getItem('usertoken'));
        this.cartservice.emptycart(user[0].id).subscribe(e=>{
          this.usercart.products=[];
          this.usercart.totalamount=0;
          this.usercart.totalitems=0;
          localStorage.setItem('usercart',JSON.stringify(this.usercart));
        },error=>{
          console.log(error);
        });
      }
      this.usercart.totalamount-=product.price;
      this.usercart.totalitems-=1;
      this.cartservice.totalitems.next(this.usercart.totalitems);
      this.products.splice(this.products.findIndex(e=>e===product),1);
       
    }
  }
  rmvitem(product:Products){
    this.products=this.products.filter((e)=>{
      return e.id!=product.id;
      });
      this.usercart.products=this.products;
      this.usercart.totalitems-=1;
      this.cartservice.totalitems.next(this.usercart.totalitems);
      this.usercart.totalamount-=(product.price*product.qty);
      localStorage.setItem('usercart',JSON.stringify(this.usercart));
      this.cartservice.updateusercart();
      //cart is empty
      if(this.products.length===0){
        let user=JSON.parse(localStorage.getItem('usertoken'));
        this.cartservice.emptycart(user[0].id).subscribe(e=>{
          this.usercart.products=[];
          this.usercart.totalamount=0;
          this.usercart.totalitems=0;
          localStorage.setItem('usercart',JSON.stringify(this.usercart));
        },error=>{
          console.log(error);
        });
      }
    }
    clearcart(){
      this.products = [];
      this.usercart.totalamount = 0;
      this.usercart.totalitems = 0;
      this.cartservice.setemptycart();

      document.getElementById('closebutton').click();
    }

}
