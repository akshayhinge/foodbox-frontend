import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../Models/category';
import { Products } from '../Models/product';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  readonly  RemoteUrl:string="https://foodbox-backend-production.up.railway.app/api/product/";
  searchkey=new BehaviorSubject<string>('');
  constructor(private http:HttpClient) { }

  getproduct(id:number):Observable<any>{
    return  this.http.get<any>(this.RemoteUrl+`${id}`);
   }
  getAllproducts():Observable<any>{
    return  this.http.get<any>(this.RemoteUrl);
   }

   // add product to existing category 
   addproductwithimg(id:number,formData:FormData):Observable<any>{
     return this.http.post<any>(this.RemoteUrl+`${id}`,formData);
    }
//product without img
   addproduct(id:number,product:Products):Observable<any>{
     return this.http.post<any>(this.RemoteUrl+`${id}`,product);
    }
    
    // update product with product id
    upadateproduct(item :Products,id:number){
      return this.http.put<any>(this.RemoteUrl+`${id}`,item );  
   }

   // Delete  
   deleteproduct(id: number): Observable<any> {
     return this.http.delete(this.RemoteUrl+`${id}`, { responseType: 'text' });
   }

}
