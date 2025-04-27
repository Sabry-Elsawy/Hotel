import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class ManageRommService {

  constructor(private _HttpClient:HttpClient) { }

  addRoom(data:any):Observable<any>{
    return this._HttpClient.post('/admin/rooms',data);
  }
  editRoom(id: string, data: any): Observable<any> {
    return this._HttpClient.put(`/admin/rooms/${id}`, data);
  }
}
