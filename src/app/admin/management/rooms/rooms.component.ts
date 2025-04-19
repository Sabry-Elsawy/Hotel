import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../../core/service/admin/rooms.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { IRoom } from '../../../core/model/room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit {
  rooms: IRoom[] = []; // Array to hold room data
  selectedRoom!:IRoom;
  searchTerm!: number ; // Search term for filtering rooms
  showModel: boolean = false; // Flag to control the display of the modal
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages!: number;
  pages: number[] = [];
  totalNumOfUsers: number = 0;
  startItem: number = 1;
  endItem: number = 10;
constructor(private _RoomsService:RoomsService , private _NgxSpinnerService:NgxSpinnerService){}
ngOnInit(): void {
  this.getALlRooms();
}
getALlRooms(): void {
  let params = {
    size: this.itemsPerPage, // Number of items per page
    page: this.currentPage, // Current page number
  };
  this._NgxSpinnerService.show(); // Show spinner while loading data
  this._RoomsService.getAllRooms(params).subscribe({
    next:(response)=>{
    //  console.log(response);
      this.rooms = response.data.rooms; // Update rooms data
      this.totalNumOfUsers = response.data.totalCount; // Update total number of rooms
      this.calculatePagination();
      this.updateItemRange();
    },
     error:(err)=>{
      console.log(err);
      this._NgxSpinnerService.hide(); // Hide spinner on error
     } 
    ,complete:()=>{
      this._NgxSpinnerService.hide(); // Hide spinner on complete
    }
  })
}


getRoomDetails(roomId: string): void {
  this._NgxSpinnerService.show(); // Show spinner while loading data
  this._RoomsService.getRoomById(roomId).subscribe({
    next:(response)=>{
      console.log(response);
      this.showModel= true; // Show the modal
      this.selectedRoom=response.data.room;
    }
    ,error:(err)=>{
      console.log(err);
      this._NgxSpinnerService.hide(); // Hide spinner on error
    },
    complete:()=>{
      this._NgxSpinnerService.hide(); // Hide spinner on complete
    }
  })
}

deleteRoom(roomId: string): void {
  this._NgxSpinnerService.show(); // Show spinner while loading data
  this._RoomsService.deleteRoom(roomId).subscribe({
    next:(response)=>{
      console.log(response);
      this.getALlRooms(); // Refresh the room list after deletion
    }
    ,error:(err)=>{
      console.log(err);
      this._NgxSpinnerService.hide(); // Hide spinner on error
    },
    complete:()=>{
      this._NgxSpinnerService.hide(); // Hide spinner on complete
    }

  })
}


closeModel(): void {
  this.showModel = false; // Close the modal
}


calculatePagination(): void {
  // Calculate total pages
  this.totalPages = Math.ceil(this.totalNumOfUsers / this.itemsPerPage);

  // Generate page numbers array
  this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
}

// Update the displayed item range for the current page
updateItemRange(): void {
  this.startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
  this.endItem = Math.min(this.currentPage * this.itemsPerPage, this.totalNumOfUsers);
}

// Navigate to a specific page
goToPage(page: number): void {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    this.getALlRooms();
  }
}

// Navigate to the previous page
previousPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
     this.getALlRooms();
  }
}

// Navigate to the next page
nextPage(): void {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
   this.getALlRooms();
  }
}

// Change the number of items per page and reload data
changePageSize(size: number): void {
  this.itemsPerPage = size;
  this.currentPage = 1; // Reset to first page when changing page size
   this.getALlRooms();
}
}
