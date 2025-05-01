import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../core/service/admin/booking.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { IBooking } from '../../../core/model/admin/booking';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {
  AllBooking:IBooking[]=[];
  selectedBooking!: IBooking;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages!: number;
  pages: number[] = [];
  totalNumOfAds: number = 0;
  startItem: number = 1;
  endItem: number = 10;
  showModel: boolean = false;
  searchInput:string='';

  constructor(private _BookingService:BookingService,private _ToastrService:ToastrService , private _NgxSpinnerService:NgxSpinnerService){}
ngOnInit(): void {
  this.getAllBookingRooms();
}
getAllBookingRooms(): void {
  let params={
    size: this.itemsPerPage, // Number of items per page
    page: this.currentPage, // Current page number
  }
  this._NgxSpinnerService.show();
  this._BookingService.getAllBookingRooms(params).subscribe({
    next:(response)=>{
// console.log(response);
      this.AllBooking=response.data.booking;
      this.totalNumOfAds = response.data.totalCount; // Total number of items
      this.calculatePagination(); // Calculate pagination based on total items
      this.updateItemRange(); // Update the displayed item range for the current page
    },
    error:(error)=>{
      console.log(error);
      this._NgxSpinnerService.hide();
    },
    complete:()=>{
      console.log("completed")
      this._NgxSpinnerService.hide();
    }

  })
}           

getBookingRoomById(id: string): void {
  this._NgxSpinnerService.show();
  this._BookingService.getBookingRoomById(id).subscribe({
    next:(response)=>{
      console.log(response);
      this.selectedBooking=response.data.booking;
      this.showModel = true; // Show the model
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

deleteBookingRoom(id: string): void {
  this._NgxSpinnerService.show();
  this._BookingService.deleteBookingRoom(id).subscribe({
    next:(response)=>{
     // console.log(response);
     this._ToastrService.success(response.message , '', { toastClass: 'custom-toast toast-success' });
      this.getAllBookingRooms();
      
    },
    error:(err)=>{
      console.log(err);
      this._ToastrService.error(err.error.message);
      this._NgxSpinnerService.hide();
      
    },
    complete:()=>{
      this._NgxSpinnerService.hide();
    }
  })
}

closeModel(): void {
  this.showModel = false; // Hide the model
}

  calculatePagination(): void {
    // Calculate total pages
    this.totalPages = Math.ceil(this.totalNumOfAds / this.itemsPerPage);
  
    // Generate page numbers array
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  
  // Update the displayed item range for the current page
  updateItemRange(): void {
    this.startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.endItem = Math.min(this.currentPage * this.itemsPerPage, this.totalNumOfAds);
  }
  
  // Navigate to a specific page
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getAllBookingRooms();
    }
  }
  
  // Navigate to the previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
       this.getAllBookingRooms();
    }
  }
  
  // Navigate to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
     this.getAllBookingRooms();
    }
  }
  
  // Change the number of items per page and reload data
  changePageSize(size: number): void {
    this.itemsPerPage = size;
    this.currentPage = 1; // Reset to first page when changing page size
     this.getAllBookingRooms();
  }
}
