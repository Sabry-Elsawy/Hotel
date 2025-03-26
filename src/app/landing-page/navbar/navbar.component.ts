import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { ProfileService } from '../services/profile/profile.service';
import { IProfile } from '../../core/model/admin/profile';
 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  userId:string = localStorage.getItem('id') || '';
  userInfo!:IProfile;
  userImage:string='';
  userName:string='';
  constructor(private elementRef: ElementRef , private _AuthService:AuthService ,private _ProfileService:ProfileService) {}
isOpen:boolean=false;
isScrolled: boolean = false; // حالة التمرير
toggleNavbar(){
  this.isOpen=!this.isOpen;
  if (this.isOpen) {
  //  document.body.style.overflow = 'hidden'; // تعطيل التمرير
  }
  else {
  //  document.body.style.overflow = ''; // تمكين التمرير
  }
}
  // // الاستماع إلى حدث النقر في الصفحة
  // @HostListener('document:click', ['$event'])
  // onClick(event: MouseEvent) {
  //   // التحقق مما إذا كان النقر خارج القائمة
  //   if (!this.elementRef.nativeElement.contains(event.target)) {
  //     this.isOpen = false; // إغلاق القائمة
  //   }
  // }


    // الاستماع إلى حدث التمرير
    @HostListener('window:scroll', [])
    onWindowScroll() {
      // التحقق من موضع التمرير
      if (window.scrollY > 0) { // يمكنك تغيير القيمة 50 حسب الحاجة
        this.isScrolled = true;
      } else {
        this.isScrolled = false;
      }
    }


    onLogout(){
      this._AuthService.myLogOut();
    }

ngOnInit(): void {
  this.getUserInfo();
}

    getUserInfo(){
      this._ProfileService.getCurrentUser(this.userId).subscribe({
        next:(response)=>{
          this.userInfo=response.data.user;
          this.userImage=response.data.user.profileImage;
          this.userName=response.data.user.userName;
        }
      })
    }
}
