import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  constructor(private _HttpClient:HttpClient) { }

  getAllAds(params:any):Observable<any>{
    return this._HttpClient.get('/admin/ads', {params:params});
  }
  getAdsById(id:string):Observable<any>{
    return this._HttpClient.get(`/admin/ads/${id}`);
  }
  deleteAds(id:string):Observable<any>{
    return this._HttpClient.delete(`/admin/ads/${id}`);
  }
  addAds(data:any):Observable<any>{
    return this._HttpClient.post('/admin/ads',data);
  }
  editAdds(id:string , discount:number , isActive:boolean):Observable<any>{
    return this._HttpClient.put(`/admin/ads/${id}`,{discount:discount,isActive:isActive});
  }
}
