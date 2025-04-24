import { Component ,OnInit} from '@angular/core';
import { AdsService } from '../../../core/service/admin/ads.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { IAds } from '../../../core/model/ads';
@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrl: './ads.component.scss'
})
export class AdsComponent implements OnInit {
  AllAds:IAds[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages!: number;
  pages: number[] = [];
  totalNumOfAds: number = 0;
  startItem: number = 1;
  endItem: number = 10;


  constructor(private _AdsService:AdsService , private _NgxSpinnerService:NgxSpinnerService){}

ngOnInit(): void {
  this.getAllAds()
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
