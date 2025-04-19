import { Component } from '@angular/core';
import { UsersService } from '../../../core/service/admin/users.service';
import { OnInit } from '@angular/core';
import { User } from '../../../core/model/admin/user';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  searchInput: string = '';
  users: User[] = [];
  selectedUser!: User;
  isLoading: boolean = false;
  showModal: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages!: number;
  pages: number[] = [];
  totalNumOfUsers: number = 0;
  startItem: number = 1;
  endItem: number = 10;

  constructor(private _usersService: UsersService , private _NgxSpinnerService:NgxSpinnerService) {}
ngOnInit(): void {
  this.getALlUsers();
}
getALlUsers(): void {
  let params = {
    size: this.itemsPerPage, // Number of items per page
    page: this.currentPage, // Current page number
  };
this._NgxSpinnerService.show(); // Show spinner while loading data
  this._usersService.getAllUsers(params).subscribe({
    next:(response)=>{
    //  console.log(response);
      this.users =response.data.users;
      this.totalNumOfUsers = response.data.totalCount; // Update total number of users
      this.calculatePagination();
      this.updateItemRange();
    },
    error:(err)=>{
      console.log(err);
      this._NgxSpinnerService.hide(); // Hide spinner on error
    },
    complete:()=>{
this._NgxSpinnerService.hide(); // Hide spinner on complete
    }
  })
}

getSpecificUserDetails(userId: string): void {
  this._NgxSpinnerService.show(); // Show spinner while loading data
  this._usersService.getSpecificUserDetails(userId).subscribe({
    next: (response) => {
     // console.log(response);
      
      this.selectedUser = response.data.user;
      this.showModal = true; // Show modal with user details
    },
    error: (err) => {
      console.log(err);
      this._NgxSpinnerService.hide(); // Hide spinner on error
    },
    complete: () => {
      this._NgxSpinnerService.hide(); // Hide spinner on complete
    }
  })
}

closeModel(): void {
  this.showModal = false; // Hide modal
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
      this.getALlUsers();
    }
  }

  // Navigate to the previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getALlUsers();
    }
  }

  // Navigate to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getALlUsers();
    }
  }

  // Change the number of items per page and reload data
  changePageSize(size: number): void {
    this.itemsPerPage = size;
    this.currentPage = 1; // Reset to first page when changing page size
    this.getALlUsers();
  }
}
