import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile/profile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProfile } from '../../../core/model/admin/profile';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit {
  currentUserId:string = localStorage.getItem('id') || '';
  userInfo!:IProfile;
constructor(private _ProfileService:ProfileService , private _NgxSpinnerService:NgxSpinnerService){}
ngOnInit(): void {
  this.getProfileInfo();
}
getProfileInfo( ):void{
  this._NgxSpinnerService.show();
  this._ProfileService.getCurrentUser(this.currentUserId).subscribe({
    next:(response)=>{
      console.log(response);
      this.userInfo=response.data.user
    },
    error:(err)=>{
      console.log(err);
      this._NgxSpinnerService.hide();
    },
    complete:()=>{
      console.log("done get profile info");
      this._NgxSpinnerService.hide();
    }
  })
}


}
