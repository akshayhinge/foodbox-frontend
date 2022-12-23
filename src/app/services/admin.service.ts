import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginData, RegisterUser, User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseURl="https://foodbox-backend-production.up.railway.app/api/admin/"
  constructor(private http:HttpClient) { }

  adminlogin(loginData:LoginData):Observable<any>{
    return this.http.get(`${this.baseURl}${loginData.phoneno}/${loginData.password}`);
  }

  adminregister(admin:RegisterUser):Observable<any>{
    return this.http.post(`${this.baseURl}`,admin);
  }
}
