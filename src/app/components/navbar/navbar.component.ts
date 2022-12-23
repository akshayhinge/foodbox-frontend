import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { observable } from 'rxjs';
import { LoginData, RegisterUser, User } from 'src/app/Models/user';
import { AuthService } from 'src/app/services/AuthService.service';
import { CartService } from 'src/app/services/cart.service';
import { ItemsService } from 'src/app/services/items.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // @ViewChild('loginoffcanvasclosebtn')loginoffcanvasclosebtn;
  isvalidUser = false;
  isvalidAdmin=false;
  loginbtnclick=false;
  isadminlogin=false;
  spinnerbtn=false;

  totalitems=0;

  alreadyuser=false;
  loginForm = new FormGroup({
    loginphoneno: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}$")]),
    loginpassword: new FormControl('', [Validators.required, Validators.minLength(6),Validators.maxLength(16)])
  });
  registerform = new FormGroup({
    fname: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z \_-\]{3,15}$")]),
    lname: new FormControl('', [Validators.required, Validators.pattern("[a-zA-z_-]{3,15}$")]),
    phoneno: new FormControl('', [Validators.required,Validators.pattern("[0-9]{10}$")]),
    password: new FormControl('', [Validators.required, Validators.minLength(6),Validators.maxLength(16)]),
    terms: new FormControl('', [Validators.requiredTrue])
  })
  constructor(private userservice:UserService,public authservice:AuthService,private itemservice:ItemsService,private cartservice:CartService) { }
  ngOnInit(): void {
    if(localStorage.getItem('usertoken')!=null){
      this.isvalidUser=true;
    }
    if(localStorage.getItem('admintoken')!=null){
      this.isvalidAdmin=true;
    }
    this.cartservice.totalitems.subscribe(e=>{
      this.totalitems=e;
    });
    let cart=JSON.parse(localStorage.getItem('usercart'));
    if(cart!=null){
      this.totalitems=cart.totalitems;
    }


  }
  search(value:string){
    this.itemservice.searchkey.next(value);
  }

  userlogin() {
    this.loginbtnclick=true;
    let logindata=new LoginData(+this.loginphoneno.value,this.loginpassword.value);

    this.authservice.authenticate(logindata);
    this.authservice.isAdminAuthenticate.subscribe(v=>{
      this.isvalidAdmin=v;
      if(this.isvalidAdmin){
        this.loginbtnclick = false;
        this.loginForm.reset();
        document.getElementById("loginoffcanvasclosebtn").click();
       }
    });
    this.authservice.isUserAuthenticate.subscribe(v=>{
      this.isvalidUser=v;
      if(this.isvalidUser){
        this.loginbtnclick = false;
        this.loginForm.reset();
        document.getElementById("loginoffcanvasclosebtn").click();
       }
    });

  }

  logout(){
    this.isvalidUser=false;
    this.isvalidAdmin=false;
    this.authservice.logout();
  }
  userregister(){
    this.spinnerbtn=true
    let user =new RegisterUser(this.fname.value,this.lname.value,+this.phoneno.value,this.password.value);
    this.userservice.adduser(user).subscribe(
      data => {
        this.alreadyuser=false;
        this.registerform.reset();
        this.spinnerbtn=false;
    document.getElementById("successbtn").click()
    document.getElementById("loginbtn").click();
  },
  error => {
    this.alreadyuser=true;
    this.spinnerbtn=false;
      });
  }



  get loginphoneno() {return this.loginForm.get('loginphoneno');}
  get loginpassword() {return this.loginForm.get('loginpassword');}
  get fname() { return this.registerform.get('fname') }
  get lname() { return this.registerform.get('lname') }
  get phoneno() { return this.registerform.get('phoneno') }
  get password() { return this.registerform.get('password') }
  get terms() { return this.registerform.get('terms') }

}
