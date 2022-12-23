import {  Products } from "./product";

export class Cart{
    id?:number=0;
    totalitems:number=0;
    totalamount:number=0;
    products?:Products[]=[];
    constructor(totalitems:number,totalamount:number,products:Products[]){
        this.totalitems=totalitems;
        this.totalamount=totalamount;
        this.products=products;
    }
}

//for updation of cart
export class setcart{
    totalitems:number=0;
    totalamount:number=0;

    constructor(totalitems:number,totalamount:number){
        this.totalitems=totalitems;
        this.totalamount=totalamount;
    }
}