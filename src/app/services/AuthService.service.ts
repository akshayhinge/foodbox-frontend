import { EventEmitter, Injectable } from '@angular/core';
import { flush } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import { AdminService } from './admin.service';
import { Cart, setcart } from '../Models/cart';
import { Products } from '../Models/product';
import { LoginData, User } from '../Models/user';
import { CartService } from './cart.service';
import { ItemsService } from './items.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserAuthenticate=new EventEmitter<boolean>(false);
  isAdminAuthenticate=new EventEmitter<boolean>(false);
  allusers: User[] = [];
  admin:User[]=[];
  public user:User[];
  usercart: Cart = {
    id: 0,
    totalitems: 0,
    totalamount: 0,
    products: []
  };

  isadminlogin=false;
  constructor(private userservice: UserService,private router:Router, private cartservice:CartService,private adminservice:AdminService) {
      }
  authenticate(logindata: LoginData){
    this.adminservice.adminlogin(logindata).subscribe(res=>{
      this.admin=res;
      localStorage.setItem('admintoken',JSON.stringify(this.admin));
      this.isAdminAuthenticate.next(true);
      this.router.navigate(['adminhome']);
    },error=>{
      this.userservice.userlogin(logindata.phoneno, logindata.password).subscribe(res => {
        this.user=res;
        this.isUserAuthenticate.next(true);
        localStorage.setItem('usertoken',JSON.stringify(this.user));
        this.getusercart(); 
      }, error => {
        console.log(error);
        
      });
    });

  }
  isuserloggedIn(): boolean {
    let token=localStorage.getItem('usertoken');
    if (token == undefined ||
      token == null ||
      token == '') {
    return false;
  } else {
    return true;
  }
  }
  isadminloggedIn(): boolean {
    let token=localStorage.getItem('admintoken');
    if (token == undefined ||
      token == null ||
      token == '') {
    return false;
  } else {
    return true;
  }
  }

  logout(){
    // this.isAuthenticate=false;
    localStorage.removeItem('usertoken');
    localStorage.removeItem('admintoken');
    localStorage.removeItem('usercart');
    this.router.navigate(['home']);
    this.isadminlogin=false;
  }


  getusercart() {
    let user:User=JSON.parse(localStorage.getItem('usertoken'));
    let usercart=JSON.parse(localStorage.getItem('usercart'));
      this.cartservice.getcart(user[0].id).subscribe(res => {     
        //resolve duplicates items
        let duplicates: number[] = [];
        let tempcart: Cart = res;
        let products: Products[] = [];

        for (let p of res.products) {
          let product = new Products(p.name, p.price, p.desc, p.isavailable, p.imgurl, 1,p.id);
          products.push(product);
        }
        // console.log(products);
        for (let i = 0; i < products.length; i++) {
          let j=1;
          for (j = j + i; j < products.length; j++) {
            if (products[i].id === products[j].id) {
              products[i].qty++;
              duplicates.push(j);
              // products.splice(j, 1);
              console.log('item push',products[j].id);
            }
          }
        }
        // console.log('dup',duplicates);
        
        let finalproducts=products.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i)
       
        tempcart.products = finalproducts;
        localStorage.setItem('usercart', JSON.stringify(tempcart));
        
      }, error => {
        // console.log(error);
        
        if(usercart!=null){
          usercart.totalamount = 0;
          usercart.totalitems = 0;
          usercart.products = [];
          localStorage.setItem('usercart', JSON.stringify(usercart));
        }else{
          this.cartservice.updateusercart();
          this.cartservice.totalitems.next(usercart.totalitems);

        }
      });

    
  }
}
