import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/Models/cart';
import { Placeorder } from 'src/app/Models/order';
import { User } from 'src/app/Models/user';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-placeorder',
  templateUrl: './placeorder.component.html',
  styleUrls: ['./placeorder.component.css']
})
export class PlaceorderComponent implements OnInit {

  paymode='';
  spinnerbtn=false;
  public userdata:User={
    id: 0,
    fname: '',
    lname: '',
    phoneno: 0,
    password: '',
    address: '',
    photourl: ''
  };
  public usercart:Cart={
    totalitems: 0,
    totalamount: 0
  };
  constructor(private order:OrderService ,private cartservice:CartService,private router:Router) { }

  ngOnInit(): void {
    let userdata=JSON.parse(localStorage.getItem('usertoken'));
    this. usercart=JSON.parse(localStorage.getItem('usercart'));

    this.userdata=userdata[0];
    
  }

  placeorder(){
    this.spinnerbtn=true;
    let userproducts:number[]=[];
    for (let p of this.usercart.products) {
      for (let i = 1; i <= p.qty; i++) {
        userproducts.push(p.id);
      }
  }
 let  date=new Date();
  let orderdata=new Placeorder(date.toDateString(),this.usercart.totalitems,this.usercart.totalamount,this.paymode);
  
    this.order.placeorder(this.userdata.id,userproducts,orderdata).subscribe(e=>{
      this.spinnerbtn=false;
      document.getElementById('placeorder').click();
      this.usercart.products=[];
      this.usercart.totalitems=0;
      this.usercart.totalamount=0;
      this.cartservice.setemptycart();
      localStorage.setItem('usercart',JSON.stringify(this.usercart));
      this.router.navigate(['/home'])
    },error=>{
      this.spinnerbtn=false;
      console.log(error);
      
    });
  }
}
