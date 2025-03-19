import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class RoomDetailsService {

  constructor(private _HttpClient:HttpClient) { }

  getRoomById(id:string):Observable<any>{
    return this._HttpClient.get(`/portal/rooms/${id}`);
  }
}
