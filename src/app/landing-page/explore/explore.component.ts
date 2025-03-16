import { Component, OnInit } from '@angular/core';
import { AdsUserService } from '../services/ads-service/ads-user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { IRoom } from '../../core/model/room';
import { Location } from '@angular/common';
import { FavoriteService } from '../services/favorite/favorite.service';
  
@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent implements OnInit {

tableDataRomms:IRoom[] = [];
constructor(private _AdsUserService:AdsUserService , private _NgxSpinnerService:NgxSpinnerService , private _Location:Location ,private _FavoriteService:FavoriteService){}

ngOnInit(): void {
  this.getAllRooms();
}


getAllRooms( ){
  let params={
    size:this.itemsPerPage,
    page:this.currentPage
   }
  this._NgxSpinnerService.show();
this._AdsUserService.getAllRooms(params).subscribe({
 next:(response)=>{
 console.log(response);
 
  this.tableDataRomms=response.data.rooms;
 this.totalNumOfRooms=response.data.totalCount
this.clacPagination();
this.updateItemRange();
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

// Add room to favorite

addtoFav(roomId:string){
  this._FavoriteService.addRoomToFav(roomId).subscribe({
    next:(response)=>{
      console.log(response);
      
    },
    error:(err)=>{
      console.log(err);
      
    },
    complete:()=>{
      console.log("Done");
      
    }
  })
}


  // Calculate the discounted price of a room
  calculateDiscountedPrice(price: number, discount: number): number {
    return price - (price * discount / 100);
  }

  goBack(){
    this._Location.back()
  }


  // ===================================


  // handle pagination in explore page

  itemsPerPage:number=10;
  startItem:number=1;
  totalPages:number=0;
  currentPage:number=1;
  totalNumOfRooms:number=0;
  endItem:number=10;

  updateItemRange(){
    this.endItem=Math.min(this.currentPage*this.itemsPerPage , this.totalNumOfRooms)
    this.startItem=(this.currentPage - 1)*this.itemsPerPage + 1;
  }

  clacPagination(){
    this.totalPages=this.totalNumOfRooms/this.itemsPerPage;
  }
  changePageSize(size:number){
    this.itemsPerPage=size;
    this.currentPage=1;
    this.getAllRooms()
  }
  previousPage(){
    if (this.currentPage>1) {
      this.currentPage--;
      this.getAllRooms()
    }
  }
  nextPage(){
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getAllRooms();
    }
  }

 
}
