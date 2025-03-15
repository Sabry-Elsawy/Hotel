import { Component, ElementRef, HostListener } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private elementRef: ElementRef , private _AuthService:AuthService) {}
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
}
