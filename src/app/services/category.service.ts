import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../Models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  readonly  RemoteUrl:string="https://foodbox-backend-production.up.railway.app/api/categories/";
  constructor(private http: HttpClient) { }
  // get  
  getcategory(id:number):Observable<any>{
    return  this.http.get<any>(this.RemoteUrl+`${id}`);
   }
  getAllcategories():Observable<any>{
    return  this.http.get<any>(this.RemoteUrl);
   }

   // add 
   addcategory(category :Category):Observable<any>{
     return this.http.post<any>(this.RemoteUrl,category);
    }
    
    // 
    upadatecategory(category :Category){
      return this.http.put<any>(this.RemoteUrl,category);  
   }

   // Delete  
   deletecategory(id: number): Observable<any> {
     return this.http.delete(this.RemoteUrl+`${id}`, { responseType: 'text' });
   }
}
