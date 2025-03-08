import { Component, OnInit } from '@angular/core';
import { AdsUserService } from '../services/ads-service/ads-user.service';
import { IAds } from '../../core/model/ads';
import { NgxSpinnerService } from 'ngx-spinner';
import { IRoom } from '../../core/model/room';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
capacity:number=0;
tableData: any;
tableUserAds: IAds[] = [];
tableDataRomms:IRoom[] = [];
 
constructor(private _AdsUserService:AdsUserService , private _NgxSpinnerService:NgxSpinnerService) { }
ngOnInit(): void {
 this.getAllAds(this.tableUserAds)
 this.getAllRomms(this.tableDataRomms)
 

 
 
 
 
}
increasementCapacity(){
  this.capacity++;  
}
decreasementCapacity(){
   if (this.capacity>0){
     this.capacity--;
    
   }
}
getAllAds(data:any){
  this._NgxSpinnerService.show();
  this._AdsUserService.getAllAds(data).subscribe({
    next: (response) => {
      this.tableData = response;
      console.log(response);
      
      this.tableUserAds = response.data.ads.slice(0,5);
      console.log(this.tableUserAds);
      
    },
    error: (err) => {
      this._NgxSpinnerService.hide();
      console.log(err);
    },
    complete: () => {
      console.log('complete');
      this._NgxSpinnerService.hide();
    }
  });

}

getAllRomms(data:any){
  this._NgxSpinnerService.show();
  this._AdsUserService.getAllRooms(data).subscribe({
    next: (response) => {
      this.tableData = response;
      this.tableDataRomms = response.data.rooms.slice(0,4);
    },
    error: (err) => {
      console.log(err);
      this._NgxSpinnerService.hide();
    },
    complete: () => {
      console.log('complete');
      this._NgxSpinnerService.hide();
    }
  })
}

// ============================================================================
 

}
