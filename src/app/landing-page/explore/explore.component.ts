import { Component, OnInit } from '@angular/core';
import { AdsUserService } from '../services/ads-service/ads-user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { IRoom } from '../../core/model/room';
 
@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent implements OnInit {
tableData: any;
tableDataRomms:IRoom[] = [];
constructor(private _AdsUserService:AdsUserService , private _NgxSpinnerService:NgxSpinnerService){}

ngOnInit(): void {
  this.getAllRooms(this.tableData);
}


getAllRooms(data:any){
  this._NgxSpinnerService.show();
this._AdsUserService.getAllRooms(data).subscribe({
 next:(response)=>{
  console.log(response);
  this.tableData=response;
  this.tableDataRomms=response.data.rooms;
 },
 error:(err)=>{
  console.log(err);
  this._NgxSpinnerService.hide();
  
 },
 complete:()=>{
  this._NgxSpinnerService.hide();
 }
})
}

  // Calculate the discounted price of a room
  calculateDiscountedPrice(price: number, discount: number): number {
    return price - (price * discount / 100);
  }

}
