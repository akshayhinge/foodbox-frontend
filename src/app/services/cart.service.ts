import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart, setcart } from '../Models/cart';
import { Products } from '../Models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly baseUrl:string="https://foodbox-backend-production.up.railway.app/api/user/cart/";

  public totalitems=new EventEmitter<number>();
  constructor(private http:HttpClient) { }

    getcart(id:number):Observable<any>{
      return this.http.get(this.baseUrl+`${id}`);
    } 
    updatecart(userid:number,pid:number[],cart:setcart):Observable<any>{
      // return this.http.put(`${this.baseUrl}${userid}/${pid}`,cart);
      return this.http.put(`${this.baseUrl}${userid}/${pid}`,cart);
    }
    emptycart(userId:number):Observable<any>{
      return this.http.delete(`${this.baseUrl}${userId}`);
    }

  addtocart(product: Products) {
    let usercart:Cart={
      id:0,
      totalamount:0,
      totalitems:0,
      products:[]
    };
    let localcart:Cart = JSON.parse(localStorage.getItem('usercart'));
    // add into cart firsttime
    if (!localcart) {
      usercart.totalitems = 1;
      usercart.totalamount = product.price;
      usercart.products.push(product);
      localStorage.setItem('usercart',JSON.stringify(usercart));
    }
    //add into existing cart 
    else {
      localcart.totalitems += 1;
      localcart.totalamount += product.price;
      localcart.products.push(product);
      localStorage.setItem('usercart',JSON.stringify(localcart));
    }
    if(localcart!=null){
      this.totalitems.next(localcart.totalitems);
    }
  }

  addqty(id: number) {
    let localcart: Cart = JSON.parse(localStorage.getItem('usercart'));
    for (let p of localcart.products) {
      if (p.id === id) {
        p.qty++;
        localcart.totalamount += p.price;
        localStorage.setItem('usercart', JSON.stringify(localcart));
        break;
      }
    }

  }
  rmvqty(id:number):boolean{
    let localcart: Cart = JSON.parse(localStorage.getItem('usercart'));
    let user: Cart = JSON.parse(localStorage.getItem('usertoken'));
    let cartbtnshow=true;
    
      for (const [i, p] of localcart.products.entries()) {
        if (p.id === id) {
          // 'qty lessthan 1'
          if (p.qty <= 1) {
            localcart.products.splice(i, 1);
            localcart.totalitems--;
            localcart.totalamount -= p.price;
            this.totalitems.next(localcart.totalitems);
            localStorage.setItem('usercart',JSON.stringify(localcart));
            return cartbtnshow=false;
            //remove qty by 1
          } else {
            p.qty--;
            localcart.totalamount -= p.price;
            localStorage.setItem('usercart',JSON.stringify(localcart));
            break;
          }
        }
      }

    return cartbtnshow=true;
  }
  updateusercart() {
    let usercart = JSON.parse(localStorage.getItem('usercart'));
    let user = JSON.parse(localStorage.getItem('usertoken'));
    let cart = new setcart(usercart.totalitems, usercart.totalamount)
    let userproducts: number[] = [];

    //divide items with there qty
    for (let p of usercart.products) {
        for (let i = 1; i <= p.qty; i++) {
          userproducts.push(p.id);
        }
    }

    //update cart 
      this.updatecart(user[0].id, userproducts, cart)
        .subscribe(res => { 
          let tempcart: Cart = res;
          let products: Products[] = [];

          //get all updeted items
          for (let p of res.products) {
            let product = new Products(p.name, p.price, p.desc, p.isavailable, p.imgurl, 1,p.id);
            products.push(product);
          }

          //add qty of duplicated items
          for (let i = 0; i < products.length; i++) {
            let j=1;
            for (j = j + i; j < products.length; j++) {
              if (products[i].id === products[j].id) {
                products[i].qty++;
              }
            }
          }
          
          //delete duplicate items
          let finalproducts=products.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i)

          tempcart.products = finalproducts;
          localStorage.setItem('usercart', JSON.stringify(tempcart));

        }, error => {
          console.log(error);

        });

    
  }

  setemptycart(){
    let user=JSON.parse(localStorage.getItem('usertoken'));
    let usercart=JSON.parse(localStorage.getItem('usercart'));
    this.emptycart(user[0].id).subscribe(e=>{
      usercart.products=[];
      usercart.totalamount=0;
      usercart.totalitems=0;
      localStorage.setItem('usercart',JSON.stringify(usercart));
    },error=>{
      console.log(error);
    });
    this.totalitems.next(0);
  }
}
