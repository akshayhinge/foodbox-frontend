import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, Placeorder } from '../Models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl:string="https://foodbox-backend-production.up.railway.app/api/user/order/";
  constructor(private http:HttpClient) { }

  getuserorders(uid:number):Observable<any>{
    return this.http.get(this.baseUrl+`${uid}`);
  }

  placeorder(uid:number,pid:number[],order:Placeorder):Observable<any>{
    return this.http.post(`${this.baseUrl}${uid}/${pid}`,order);
  }

}
