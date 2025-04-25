import { Component ,OnInit} from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfileService } from '../../core/service/admin/profile.service';
import { IProfile } from '../../core/model/admin/profile';
 
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  userInfo!:IProfile;
  isProfileOpen:boolean = false;
  isSidebarOpen:boolean = false;
  userProfilrId:string=localStorage.getItem('id') || '';
  constructor(private _AuthService:AuthService, private _NgxSpinnerService:NgxSpinnerService , private _ProfileService:ProfileService){}
 ngOnInit(): void {
   this.getUserProfile();
 }
  toggleSidebar(){
    this.isSidebarOpen = !this.isSidebarOpen;
    if (this.isSidebarOpen) {
     // document.body.classList.add('sidebar-open');
    }
  }
  getUserProfile() {
    this._ProfileService.getCurrentUser(this.userProfilrId).subscribe({
      next: (res) => {
        //console.log(res);
        this.userInfo = res.data.user;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen;
  }

  logOut() {
    this._AuthService.myLogOut();
  }

}
