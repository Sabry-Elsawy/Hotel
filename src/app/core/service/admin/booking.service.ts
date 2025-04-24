import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private _HttpClient:HttpClient) { }

  getAllBookingRooms(params:any): Observable<any> {
    return this._HttpClient.get('/admin/booking', { params:params });
  }
  getBookingRoomById(id: string): Observable<any> {
    return this._HttpClient.get(`/admin/booking/${id}`);
  }
  deleteBookingRoom(id: string): Observable<any> {
    return this._HttpClient.delete(`/admin/booking/${id}`);
  }
}
