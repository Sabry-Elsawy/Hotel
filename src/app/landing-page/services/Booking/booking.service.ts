import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private _HttpClient:HttpClient) { }

  startBooking(bookingForm:FormGroup):Observable<any>{
    return this._HttpClient.post<any>(`/portal/booking`, bookingForm)
  }

}
