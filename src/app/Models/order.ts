import { Products } from "./product";

export class Order{
    id:number;
    date:string;
    totalitems:number;
    totalamount:number;
    paymentmode:number;
    products?:Products;

    constructor(){}
}
export class Placeorder{
    date:string;
    totalitems:number;
    totalamount:number;
    paymentmode:string;

    constructor(
        date: string,
        totalitems: number,
        totalamount: number,
        paymentmode: string,) 
    {
        this.date = date
        this.totalitems = totalitems;
        this.totalamount = totalamount;
        this.paymentmode = paymentmode;
    }

}