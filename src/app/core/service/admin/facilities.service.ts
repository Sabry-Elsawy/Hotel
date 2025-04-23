import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class FacilitiesService {

  constructor(private _HttpClient:HttpClient) { }

  getAllFacilities(params:any):Observable<any>{
    return this._HttpClient.get("/admin/room-facilities", {params:params});
  }
  getFacilityById(facilityId:string):Observable<any>{
    return this._HttpClient.get(`/admin/room-facilities/${facilityId}`)
  }
}
