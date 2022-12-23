import { Component, OnInit } from '@angular/core';
import { flush } from '@angular/core/testing';
import { elementAt } from 'rxjs';
import { Cart } from 'src/app/Models/cart';
import { Category } from 'src/app/Models/category';
import {  Products, ProductsWithCategories } from 'src/app/Models/product';
import { AuthService } from 'src/app/services/AuthService.service';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories:Category[]=[];
  products:Products[]=[];
  category:Category;

  searchvalue='';
  qty=1;

  sortDescending:boolean=false;
  sortBy='';
  reverseOrder=false;
  itemsTitle:boolean=true;
  cartbtnshow: boolean[] = [];

  
  categoryname:string='';

  constructor(private authser:AuthService,private categoryservice:CategoryService,private itemservice:ItemsService,private cartservice:CartService) { }

  ngOnInit(): void {
    let localcart: Cart = JSON.parse(localStorage.getItem('usercart'));
    let user=JSON.parse(localStorage.getItem('usertoken'));
    this.categoryservice.getAllcategories().subscribe(data => {
      this.categories = data;
      for (let c of this.categories) {
        for (let p of c.products) {
          if(p.qty==null || p.qty===undefined){
            p.qty=1;
            if(localcart!=null){
              for (let c of localcart.products) {
                if (p.id === c.id) {
                  p.qty = c.qty;
                  this.cartbtnshow[p.id] = true;
                }
              }
            }
          }
            this.products.push(p);
        }
      }
    });
    
    
    this.itemservice.searchkey.subscribe(v=>{
      this.searchvalue=v;
    });

  

  }

  //get all items
  allitems() {
    this.searchvalue='';
    this.itemsTitle=true;
    this.products=[];
    for (let c of this.categories) {
      for (let p of c.products) {
        this.products.push(p);
      }
    }
  }

  //filter items with category
  filtering(catname: string) {
    this.searchvalue='';
    this.itemsTitle=false;
    this.categoryname = catname;
    const result = this.categories.find(element => {
      return element.name.toUpperCase() === catname.toUpperCase();
    });
    this.products = result.products;
  }

  //sort items with price
  sorting(value:string) {
    this.sortBy=value;
    this.reverseOrder=!this.reverseOrder
  }

  //add to cart
  addtocartclick(id: number, product: Products) {
    let userData=JSON.parse(localStorage.getItem('usertoken'));
    if(userData){
      //with login
      this.cartservice.addtocart(product);
      this.cartservice.updateusercart();
      
    }else{
      //without login
      this.cartservice.addtocart(product);
    }
    this.cartbtnshow[id] = true;
  }

  //add quantity
  addqty(product:Products) {
    let user=JSON.parse(localStorage.getItem('usertoken'));
    this.cartservice.addqty(product.id);
    product.qty++;
    if(user!=null){
      this.cartservice.updateusercart();
    }
  }
  // remove quantity
  rmvqty(product:Products) {
    let user=JSON.parse(localStorage.getItem('usertoken'));
    if(product.qty > 1){
      product.qty--;
    }
    let isbtnshow=this.cartservice.rmvqty(product.id);
    if(!isbtnshow){
      this.cartbtnshow[product.id] = false;
    }
    if(user!=null){
      this.cartservice.updateusercart();
    }
  }
 
}


