import { Component } from '@angular/core';
import { RegxPassword } from '../login/login.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
 
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

  constructor(private _NgxSpinnerService:NgxSpinnerService , private _AuthService:AuthService,private _ToastrService:ToastrService){}

  hidepass:boolean = true;
  hidePassword:boolean = true;
  hideCurrentPassword:boolean=true;
  successMassege:string='Password changed successfully';

  changePassword=new FormGroup({
    oldPassword:new FormControl(null, [Validators.required,Validators.pattern(RegxPassword)]),
    newPassword:new FormControl(null, [Validators.required,Validators.pattern(RegxPassword)]),
    confirmPassword:new FormControl(null, [Validators.required,Validators.pattern(RegxPassword)]),
  },{validators:this.confirmPassword})

  onSubmit(data:FormGroup):void{
     if (this.changePassword.valid) {
      this._NgxSpinnerService.show();
      this._AuthService.onUserChangePassword(data.value).subscribe({
        next:(response)=>{
          console.log(response);
          this.changePassword.reset();
        //  this.successMassege=response.message;
        this._ToastrService.success(`${this.successMassege}`, '', { toastClass: 'custom-toast toast-success' })
        },
        error:(err)=>{
          console.log(err);
          this._NgxSpinnerService.hide();
          this._ToastrService.error(err.error.message)
        },
        complete:()=>{
        //  console.log("done change password");
          this._NgxSpinnerService.hide()
        }
      })
     }
    
  }

  confirmPassword(registerForm:any){
    let passwordControl= registerForm.get('newPassword')
    let confirmPasswordControl= registerForm.get('confirmPassword')
    if (passwordControl?.value == confirmPasswordControl?.value) {
      return null;
    }
    else{
       confirmPasswordControl?.setErrors({passwordMatch: 'password and confirm password not match'})
       return {passwordMatch: 'password and confirm password not match'};
    }
}

  toggleSeeCurrentPass(){
    this.hideCurrentPassword=!this.hideCurrentPassword;
  }

  toggleSee(){
    this.hidepass = !this.hidepass;
  }
  toggleSeeConfirm(){
    this.hidePassword = !this.hidePassword;
  }
}
