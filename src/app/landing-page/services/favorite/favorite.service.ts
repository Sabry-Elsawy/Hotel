import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private _HttpClient:HttpClient) { }

  getRoomFav(): Observable<any> {
    return this._HttpClient.get('/portal/favorite-rooms');
  }

  addRoomToFav(roomId:string):Observable<any>{
  return  this._HttpClient.post('/portal/favorite-rooms',{roomId:roomId})
  }

  removeFromFav(roomId:string):Observable<any>{
    return this._HttpClient.delete(`/portal/favorite-rooms/${roomId}`,  { body: { roomId } })
  }
}
