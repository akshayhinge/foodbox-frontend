import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { RegisterUser, User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly  RemoteUrl:string="https://foodbox-backend-production.up.railway.app/api/user/";
  constructor(private http: HttpClient) { }

  userlogin(uname:number,pword:string):Observable<any>{
    return this.http.get<any>(this.RemoteUrl+`${uname}`+'/'+`${pword}`);
  }
  // get user 
  getuser(id:number):Observable<any>{
    return  this.http.get<any>(this.RemoteUrl+`${id}`);
   }
  getAllUser():Observable<any>{
    return  this.http.get<any>(this.RemoteUrl);
   }

   // add user
   adduser(user :RegisterUser):Observable<any>{

     return this.http.post<any>(this.RemoteUrl,user);
    }
    
    // same as insert but method is put insted of post 
    upadateuser(user:User){
      return this.http.put<any>(this.RemoteUrl,user);  
   }

   // Delete  user id 
   deleteuserserv(id: number): Observable<any> {
     return this.http.delete(this.RemoteUrl+`${id}`, { responseType: 'text' });
   }
}
