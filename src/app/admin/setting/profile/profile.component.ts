import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { ProfileService } from '../../../core/service/admin/profile.service';
import { IProfile } from '../../../core/model/admin/profile';
import { NgxSpinnerService } from 'ngx-spinner';
 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  isEditing:boolean = false;
  userInfo!:IProfile;
  username:string=''

cuurrentUserId:string=localStorage.getItem('id') || '';
constructor(private _AuthService:AuthService , private _ProfileService:ProfileService ,private _NgxSpinnerService:NgxSpinnerService){}

ngOnInit(): void {
  this.getCurrentUser();
}

getCurrentUser():void{

  this._NgxSpinnerService.show();
  this._ProfileService.getCurrentUser(this.cuurrentUserId).subscribe({
    next:(res)=>{
    //  console.log(res);
      this.userInfo = res.data.user;
     // console.log(this.userInfo);
    },
    error:(err)=>{
      console.log(err);
      this._NgxSpinnerService.hide();
    },
    complete:()=>{
    //  console.log('completed');
      this._NgxSpinnerService.hide();
    }
  })
}

formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

logOut():void{
  this._AuthService.myLogOut();
}

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveChanges(): void {
    // In a real app, this would save to the backend
    this.isEditing = false;
    // Show success message
    alert('Profile updated successfully!');
  }
}
