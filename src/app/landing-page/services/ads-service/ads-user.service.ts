import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdsUserService {

  constructor(private _HttpClient:HttpClient) { }


  getAllAds( ):Observable<any>
  {
    return this._HttpClient.get('/portal/ads'  );
  }
  getAllRooms(params:any ):Observable<any>
  {
    return this._HttpClient.get('/portal/rooms/available',{params:params} );
  }


  
}
