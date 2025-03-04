import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
   
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }

onLogin(data:object):Observable<any>{
  return this._HttpClient.post('/admin/users/login',data)

}

onRegister(data:any):Observable<any>{
  return this._HttpClient.post("/portal/users",data)
}

}
