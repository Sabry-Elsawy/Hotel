import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isProfileOpen:boolean = false;
  isSidebarOpen:boolean = false;
  toggleSidebar(){
    this.isSidebarOpen = !this.isSidebarOpen;
    if (this.isSidebarOpen) {
     // document.body.classList.add('sidebar-open');
    }
  }
  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen;
  }
}
