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
  room!:IRoom;
  roomImages:string[]=[];
  showBookingForm = false;
  selectedImageIndex = 0;
  visibleThumbnails: number[] = [];
  readonly thumbnailsToShow = 4;

  constructor(private _ActivatedRoute:ActivatedRoute , private _RoomDetailsService:RoomDetailsService){}

  ngOnInit(): void {
    //extract the room ID from the route parameters
  const roomId=  this._ActivatedRoute.snapshot.params['id']
 // console.log(roomId);
  this.getRoomById(roomId);
  }
  // Function to fetch room details based on the room ID
  getRoomById(id:string){
    this._RoomDetailsService.getRoomById(id).subscribe({
      next:(response)=>{
        console.log(response);
        this.room=response.data.room
        this.roomImages=response.data.room.images
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
   // Function to update the selected image index in the gallery

  setSelectedImage(index:number){
    this.selectedImageIndex=index;
    this.updateVisibleThumbnails();
  }
    // Function to navigate through the image gallery

  moveGallary(direction : 'prev' | 'next'){
    if (direction === 'next' && this.selectedImageIndex<this.roomImages.length - 1) {
      this.selectedImageIndex++;
    }
    else if(direction === 'prev' && this.selectedImageIndex>0){
      this.selectedImageIndex--;
    }
    this.updateVisibleThumbnails();
  }
    // Function to update the array of visible thumbnail indexes

  updateVisibleThumbnails(){
    const start = Math.max(0 , Math.min(this.selectedImageIndex - Math.floor(this.thumbnailsToShow / 2)),this.roomImages.length -this.thumbnailsToShow);

    this.visibleThumbnails = Array.from({length:Math.min(this.thumbnailsToShow,this.roomImages.length)},
  (_,i)=>start+i
)

  }
  // Function to calculate the price after applying a discount

  calculateDiscountedPrice(price:number, discount:number):number{
    return price - (price * discount / 100);
  }
    // Function to toggle the booking form visibility
    toggleBookingForm() {
      if (!this.room.isBooked) {
        this.showBookingForm = !this.showBookingForm;
      }
    }
}
