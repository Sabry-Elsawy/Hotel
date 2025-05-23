import { Component ,OnInit} from '@angular/core';
import { FacilitiesService } from '../../../core/service/admin/facilities.service';
import { IFacility } from '../../../core/model/room';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrl: './facilities.component.scss'
})
export class FacilitiesComponent implements OnInit {
  searchTerm: string = ""; // Search term for filtering facilities
  AllFacilities:IFacility[] = []; // Array to hold all facilities
  selectedFacility!: IFacility  ; // Selected facility for editing
  showModel: boolean = false; // Flag to control the display of the modal
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages!: number;
  pages: number[] = [];
  totalNumOfUsers: number = 0;
  startItem: number = 1;
  endItem: number = 10;
  newNameFacility: string = ""; // New facility name for adding a facility
  currentFacility:string = ""; // Current facility name for editing
  showAddFacilityModel: boolean = false; // Flag to control the display of the add facility modal
  flagEdit: boolean = false; // Flag to control the edit mode
  nameFacilityEditing: string = ""; // Facility name for editing
  currentFacilityId: string = ""; // Current facility ID for editing
constructor(private _FacilitiesService:FacilitiesService ,private _ToastrService:ToastrService, private _NgxSpinnerService:NgxSpinnerService){}

ngOnInit(): void {
  this.getAllFacilities(); // Fetch all facilities on component initialization

}

getAllFacilities(){
  let params={
    size: this.itemsPerPage, // Number of items per page
    page: this.currentPage, // Current page number
  }
  this._NgxSpinnerService.show(); // Show loading spinner
  this._FacilitiesService.getAllFacilities(params).subscribe({
    next:(response)=>{
      console.log(response);
      this.AllFacilities = response.data.facilities; // Assign the facilities data to the component property
      this.totalNumOfUsers = response.data.totalCount; // Total number of users from the response
      this.calculatePagination();
      this.updateItemRange();
      
    }
    ,error:(error)=>{
      console.log(error);
      this._NgxSpinnerService.hide(); // Hide loading spinner on error
    },
    complete:()=>{
//console.log("completed")
      this._NgxSpinnerService.hide(); // Hide loading spinner on completion
    }
  })
}

getFacilityById(facilityId:string){
  this._NgxSpinnerService.show(); // Show loading spinner
  this._FacilitiesService.getFacilityById(facilityId).subscribe({
    next:(response)=>{
      console.log(response);
      this.selectedFacility = response.data.facility; // Assign the selected facility data to the component property
      this.showModel = true; // Show the modal for editing
    },
    error:(error)=>{
      console.log(error);
      this._NgxSpinnerService.hide(); // Hide loading spinner on error
    },
    complete:()=>{
      //console.log("completed")
      this._NgxSpinnerService.hide(); // Hide loading spinner on completion
    }
  })
}


deleteFacility(facilityId:string){
  this._NgxSpinnerService.show(); // Show loading spinner
  this._FacilitiesService.deleteFacility(facilityId).subscribe({
    next:(response)=>{
      //console.log(response);
      this._ToastrService.success(response.message , '', { toastClass: 'custom-toast toast-success' });
      this.getAllFacilities(); // Refresh the facilities list after deletion
    },
    error:(error)=>{
      console.log(error);
      this._ToastrService.error(error.error.message);
      this._NgxSpinnerService.hide(); // Hide loading spinner on error
    },
    complete:()=>{
      //console.log("completed")
      this._NgxSpinnerService.hide(); // Hide loading spinner on completion
    }
  })
}

addNewFacility(){
  this._NgxSpinnerService.show(); // Show loading spinner
  this._FacilitiesService.addNewFacility(this.newNameFacility).subscribe({
    next:(response)=>{
   //   console.log(response);
   this._ToastrService.success(response.message , '', { toastClass: 'custom-toast toast-success' });
      this.getAllFacilities(); // Refresh the facilities list after adding a new facility
      this.showAddFacilityModel = false; // Close the add facility modal
    },
    error:(error)=>{
      console.log(error);
      this._ToastrService.error(error.error.message);
      this._NgxSpinnerService.hide(); // Hide loading spinner on error
    },
    complete:()=>{
      //console.log("completed")
      this._NgxSpinnerService.hide(); // Hide loading spinner on completion
    }
  })
}


showEditingFacilitiesModel(id:string): void {
   this._FacilitiesService.getFacilityById(id).subscribe({
    next: (response) => {
      this.currentFacility = response.data.facility.name; // Assign the selected facility data to the component property
      this.newNameFacility = response.data.facility.name; // Assign the selected facility name to the editing property
      this.currentFacilityId = response.data.facility._id; // Assign the selected facility ID to the editing property
      this.showAddFacilityModel = true; // Show the modal for editing
      this.flagEdit = true; // Set the edit flag to true
    }
  });
}

editOrAddFacility(): void {
  if (this.flagEdit) {
    this.editfacility(); // Call the edit facility method if in edit mode
  } else {
    this.addNewFacility(); // Call the add new facility method if not in edit mode
  }
}

editfacility( ):void{
  this._NgxSpinnerService.show(); // Show loading spinner
  this._FacilitiesService.updateFacility(this.currentFacilityId , this.newNameFacility).subscribe({
    next:(response)=>{
   //   console.log(response);
   this._ToastrService.success(response.message , '', { toastClass: 'custom-toast toast-success' });
      this.getAllFacilities(); // Refresh the facilities list after editing
      this.showAddFacilityModel = false; // Close the add facility modal
      this.flagEdit = false; // Reset the edit flag
    }
    ,error:(error)=>{
      console.log(error);
      this._ToastrService.error(error.error.message);
      this._NgxSpinnerService.hide(); // Hide loading spinner on error
    }
    ,complete:()=>{
      //console.log("completed")
      this._NgxSpinnerService.hide(); // Hide loading spinner on completion
    }
  })
}

openFacilityModel(): void {
  this.showAddFacilityModel = true; // Open the add facility modal
}

closeModel(): void {
  this.showModel = false; // Close the modal
}
closeFacilityModel(): void {
  this.showAddFacilityModel = false; // Close the add facility modal
  this.flagEdit = false; // Reset the edit flag
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
    this.getAllFacilities();
  }
}

// Navigate to the previous page
previousPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
     this.getAllFacilities();
  }
}

// Navigate to the next page
nextPage(): void {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
   this.getAllFacilities();
  }
}

// Change the number of items per page and reload data
changePageSize(size: number): void {
  this.itemsPerPage = size;
  this.currentPage = 1; // Reset to first page when changing page size
   this.getAllFacilities();
}
}
