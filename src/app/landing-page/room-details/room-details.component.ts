import { Component, OnInit } from '@angular/core';
import { IRoom } from '../../core/model/room';
import { ActivatedRoute } from '@angular/router';
import { RoomDetailsService } from '../services/room-details/room-details.service';
 
@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.scss'
})
export class RoomDetailsComponent implements OnInit{
  room:IRoom[]=[];
  roomImages:string[]=[];
  roomFacilities:string='';
  selectedImageIndex = 0;
  visibleThumbnails: number[] = [];
  readonly thumbnailsToShow = 4;

  constructor(private _ActivatedRoute:ActivatedRoute , private _RoomDetailsService:RoomDetailsService){}

  ngOnInit(): void {
  const roomId=  this._ActivatedRoute.snapshot.params['id']
 // console.log(roomId);
  this.getRoomById(roomId);
  }
// get room by id
  getRoomById(id:string){
    this._RoomDetailsService.getRoomById(id).subscribe({
      next:(response)=>{
        console.log(response);
        this.room=response.data.room
        this.roomImages=response.data.room.images
        this.roomFacilities=response.data.room.facilities[0].name
        console.log(this.room);
        this.updateVisibleThumbnails()
      },
      error:(err)=>{
        console.log(err);
        
      },
      complete:()=>{
        console.log('Done get room by id');
        
      }
    })
  }
 
  setSelectedImage(index:number){
    this.selectedImageIndex=index;
  }
  moveGallary(direction : 'prev' | 'next'){
    if (direction === 'next' && this.selectedImageIndex<this.roomImages.length - 1) {
      this.selectedImageIndex++;
    }
    else if(direction === 'prev' && this.selectedImageIndex>0){
      this.selectedImageIndex--;
    }
    this.updateVisibleThumbnails();
  }
  updateVisibleThumbnails(){
    const start = Math.max(0 , Math.min(this.selectedImageIndex - Math.floor(this.thumbnailsToShow / 2)),this.roomImages.length -this.thumbnailsToShow);

    this.visibleThumbnails = Array.from({length:Math.min(this.thumbnailsToShow,this.roomImages.length)},
  (_,i)=>start+i
)

  }
}
