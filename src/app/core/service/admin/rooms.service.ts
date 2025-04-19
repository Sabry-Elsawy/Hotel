import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private _HttpClient:HttpClient) { }
  getAllRooms(params :any):Observable<any>{
    return this._HttpClient.get('/admin/rooms' , {params:params})
  }
  getRoomById(roomId: string): Observable<any> {
    return this._HttpClient.get(`/admin/rooms/${roomId}`);
  }
  
  deleteRoom(id: string): Observable<any> {
    return this._HttpClient.delete(`/admin/rooms/${id}`);
  }
  
}
