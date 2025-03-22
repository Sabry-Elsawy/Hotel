import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
  
@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private _HttpClient:HttpClient) { }

  setReview(data:FormGroup):Observable<any>{
    return this._HttpClient.post<any>(`/portal/room-reviews/`, data)
  }
}
