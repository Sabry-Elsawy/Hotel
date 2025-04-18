import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
 
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isProfileOpen:boolean = false;
  isSidebarOpen:boolean = false;
  constructor(private _AuthService:AuthService, private _NgxSpinnerService:NgxSpinnerService){}
  toggleSidebar(){
    this.isSidebarOpen = !this.isSidebarOpen;
    if (this.isSidebarOpen) {
     // document.body.classList.add('sidebar-open');
    }
  }
  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen;
  }

  logOut() {
    this._AuthService.myLogOut();
  }

}
