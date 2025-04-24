import { Component ,OnInit} from '@angular/core';
import { AdsService } from '../../../core/service/admin/ads.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { IAds } from '../../../core/model/ads';
import { RoomsService } from '../../../core/service/admin/rooms.service';
import { IRoom } from '../../../core/model/room';
import { FormControl, FormGroup, Validators } from '@angular/forms';
 
@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrl: './ads.component.scss'
})
export class AdsComponent implements OnInit {
  AllAds:IAds[] = [];
  selectedAds!:IAds;
  allRooms:IRoom[] = []; // Array to hold all available rooms
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages!: number;
  pages: number[] = [];
  totalNumOfAds: number = 0;
  startItem: number = 1;
  endItem: number = 10;
  showModel:boolean=false;
  showModelAddAds:boolean=false;
  showModelEditAds:boolean=false;
  isActiveEditing:boolean=false;
  discountEditing:number=0;
  roomIdEditing:string='';


  constructor(private _AdsService:AdsService , private _NgxSpinnerService:NgxSpinnerService , private _RoomsService:RoomsService){}


  adsForm = new FormGroup({
    room:new FormControl('', [Validators.required]),
    discount:new FormControl('', [Validators.required]),
    isActive:new FormControl('', [Validators.required]),
  })

  handleFormSubmit(data :FormGroup) {
    if (this.adsForm.valid) {
      this._NgxSpinnerService.show();

   this._AdsService.addAds(data.value).subscribe({
      next:(response)=>{
     //   console.log(response);
        this.adsForm.reset();
        this.getAllAds(); // Refresh the list after adding a new ad
        this.showModelAddAds=false; // Hide the modal after submission
      }
      ,error:(error)=>{
        console.log(error);
        this._NgxSpinnerService.hide();
      }
      ,complete:()=>{
        this._NgxSpinnerService.hide();
      }
    })
   
  }
}
    

ngOnInit(): void {
  this.getAllAds()
  this.getAllRooms(); // Fetch all available rooms on component initialization
}

  getAllAds(){
    let params={
      size: this.itemsPerPage, // Number of items per page
      page: this.currentPage, // Current page number
    }
    this._NgxSpinnerService.show();
this._AdsService.getAllAds(params).subscribe({
  next:(response)=>{
  //  console.log(response);
    this.AllAds= response.data.ads; // Array of items for the current page
    this.totalNumOfAds = response.data.totalCount; // Total number of items
    this.calculatePagination(); // Calculate pagination based on total items
    this.updateItemRange(); // Update the displayed item range for the current page
  },
  error:(error)=>{
    this._NgxSpinnerService.hide();
    console.log(error);
  },
  complete:()=>{
    this._NgxSpinnerService.hide();
   // console.log("completed");
  }
})
  }

deleteAds(id:string){
  this._NgxSpinnerService.show();
  this._AdsService.deleteAds(id).subscribe({
    next:(response)=>{
    //  console.log(response);
      this.getAllAds(); // Refresh the list after deletion
    }
    ,error:(error)=>{
      console.log(error);
      this._NgxSpinnerService.hide();
    }
    ,complete:()=>{
      this._NgxSpinnerService.hide();
    }
  })
}

getAdsById(id:string){
  this._NgxSpinnerService.show();
  this._AdsService.getAdsById(id).subscribe({
    next:(response)=>{
      //console.log(response);
      
      this.selectedAds=response.data.ads; // Assign the selected ad to the variable
      this.showModel=true; // Show the modal
    },
    error:(error)=>{
      console.log(error);
      this._NgxSpinnerService.hide();
    },
    complete:()=>{
      this._NgxSpinnerService.hide();
    }
  })
}

getAdsByIdForEdit(id:string){
  this._NgxSpinnerService.show();
  this._AdsService.getAdsById(id).subscribe({
    next:(response)=>{
   //   console.log(response);
      this.selectedAds=response.data.ads; // Assign the selected ad to the variable
      this.isActiveEditing=this.selectedAds.isActive; // Assign the isActive value for editing
      this.discountEditing=this.selectedAds.room.discount; // Assign the discount value for editing
      this.roomIdEditing=this.selectedAds._id; // Assign the room ID for editing
      this.showModelEditAds=true; // Show the modal for editing
    },
    error:(error)=>{
      console.log(error);
      this._NgxSpinnerService.hide();
    },
    complete:()=>{
      this._NgxSpinnerService.hide();
    }
  })
}

editAds(){
  this._NgxSpinnerService.show();

this._AdsService.editAdds(this.roomIdEditing , this.discountEditing , this.isActiveEditing).subscribe({
  next:(response)=>{
    console.log(response);
    this.getAllAds(); // Refresh the list after editing
    this.showModelEditAds=false; // Hide the modal after submission
  },
  error:(error)=>{
    console.log(error);
    this._NgxSpinnerService.hide();
  },
  complete:()=>{
    this._NgxSpinnerService.hide();
  }
})
}
  // Fetch all available rooms
  getAllRooms() {
    let params = {
      size: 100,
      page: 1
    }
    this._RoomsService.getAllRooms(params).subscribe({
      next: (res) => {        
        if (res.success) {          
          this.allRooms = res.data.rooms
        }
      }, error: (err) => {
        console.log(err);
      }
    })
  }

closeModel(){
  this.showModel=false;
}
closeModelAddAds(){
  this.showModelAddAds=false;
}
openModelAddAds(){
  this.showModelAddAds=true;
}
closeModelEditAds(){
  this.showModelEditAds=false;
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
      this.getAllAds();
    }
  }
  
  // Navigate to the previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
       this.getAllAds();
    }
  }
  
  // Navigate to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
     this.getAllAds();
    }
  }
  
  // Change the number of items per page and reload data
  changePageSize(size: number): void {
    this.itemsPerPage = size;
    this.currentPage = 1; // Reset to first page when changing page size
     this.getAllAds();
  }
}
