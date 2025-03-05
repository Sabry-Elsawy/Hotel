import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
    
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient , private _Router:Router) { }

onLogin(data:object):Observable<any>{
  return this._HttpClient.post('/admin/users/login',data)

}

onRegister(data:any):Observable<any>{
  return this._HttpClient.post("/portal/users",data)
}

onForgotPassword(data:FormGroup):Observable<any>{
  return this._HttpClient.post('/portal/users/forgot-password',data)
}

myLogOut(){
  localStorage.clear();
  this._Router.navigate(['/Auth/login'])
}
 

}
