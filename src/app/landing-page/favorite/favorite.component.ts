import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorite/favorite.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { IRoom } from '../../core/model/room';
import { ToastrService } from 'ngx-toastr';
 
@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss'
})
export class FavoriteComponent implements OnInit {
  allRoomFav:IRoom[]=[];
constructor(private _FavoriteService:FavoriteService , private _NgxSpinnerService:NgxSpinnerService, private _ToastrService:ToastrService){}
ngOnInit(): void {
  this.getRoomFav()
 
  
}

getRoomFav(){
  this._NgxSpinnerService.show()
  this._FavoriteService.getRoomFav().subscribe({
    next:(response)=>{
 //     console.log(response);
      this.allRoomFav=response.data.favoriteRooms[0].rooms
    //  console.log(this.allRoomFav);
      
    },
    error:(err)=>{
      console.log(err);
      this._NgxSpinnerService.hide()
    },
    complete:()=>{
     // console.log("Done");
     this._NgxSpinnerService.hide()
    }
  })
}

removeFromFav(roomId:string){
  this._NgxSpinnerService.show()
  this._FavoriteService.removeFromFav(roomId).subscribe({
    next:(response)=>{
      console.log(response);
     // this.allRoomFav=response.data.favoriteRoom.rooms
     this._ToastrService.success(response.message, '', { toastClass: 'custom-toast toast-success' });
     this.getRoomFav()
    },
    error:(err)=>{
      console.log(err);
      this._ToastrService.error(err.error.message);
      this._NgxSpinnerService.hide()
    },
    complete:()=>{
      console.log("Done");
      this._NgxSpinnerService.hide()
    }
  })
}

}
