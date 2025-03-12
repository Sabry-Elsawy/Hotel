import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AdsUserService } from '../services/ads-service/ads-user.service';
import { IAds } from '../../core/model/ads';
import { NgxSpinnerService } from 'ngx-spinner';
import { IRoom } from '../../core/model/room';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation:ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
capacity:number=0;
tableData: any;
tableAllAds: IAds[] = [];
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
      this.tableAllAds=response.data.ads
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
firstCarouselOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 500,
  navText: ['<i class="fa-solid fa-chevron-left"></i>', '<i class="fa-solid fa-chevron-right"></i>'],

  responsive: {
    0: {
      items: 1
    },
    576: {
      items: 2
    },
    768: {
      items: 3
    },
    960: {
      items: 4
    }
  },
  nav: true,
  autoplay: true,
  autoplayTimeout: 5000, 
  autoplayHoverPause: true ,
}

 
secondCarouselOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
 
  navSpeed: 500,
  nav: true,
  navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],

  responsive: {
    0: { items: 1 }
  },

  autoplay: false,
  autoplayTimeout: 5000, 
  autoplayHoverPause: true ,
 
}
 
// ==============================================

}
