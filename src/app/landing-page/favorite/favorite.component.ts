import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorite/favorite.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { IRoom } from '../../core/model/room';
 
@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss'
})
export class FavoriteComponent implements OnInit {
  allRoomFav:IRoom[]=[];
constructor(private _FavoriteService:FavoriteService , private _NgxSpinnerService:NgxSpinnerService){}
ngOnInit(): void {
  this.getRoomFav()
 
  
}

getRoomFav(){
  this._FavoriteService.getRoomFav().subscribe({
    next:(response)=>{
      console.log(response);
      this.allRoomFav=response.data.favoriteRooms[0].rooms
      console.log(this.allRoomFav);
      
    },
    error:(err)=>{
      console.log(err);
      
    },
    complete:()=>{
      console.log("Done");
      
    }
  })
}
}
