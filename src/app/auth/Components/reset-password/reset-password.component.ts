import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../services/auth.service';
import { RegxPassword } from '../login/login.component';
  
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
hidepass:boolean=true;
hidePassword:boolean=true;
errorMassage:string='';
constructor(private  _Spinner:NgxSpinnerService,private _Router:Router , private _AuthService:AuthService) { }



resetPasswordForm:FormGroup = new FormGroup({
  email : new FormControl(null , [Validators.required , Validators.email]),
  seed: new FormControl(null, [Validators.required]),
  password : new FormControl(null , [Validators.required , Validators.pattern(RegxPassword)]),
  confirmPassword : new FormControl(null , [Validators.required , Validators.pattern(RegxPassword)])
},{validators : this.confirmPassword});

onSubmitResetPasswordForm(data:FormGroup){
 // console.log(data);
  this._Spinner.show();
  this._AuthService.onResetPassword(data.value).subscribe({
    next:(res)=>{
      console.log(res);
      
    },
    error:(err)=>{
      console.log(err);
      this._Spinner.hide();
      this.errorMassage=err.error.message;
    },
    complete:()=>{
      this._Spinner.hide();
      this._Router.navigate(['/Auth/login']);
    }
  })

}

confirmPassword(resetPasswordForm:any){
  let passwordControl= resetPasswordForm.get('password')
  let confirmPasswordControl= resetPasswordForm.get('confirmPassword')
  if (passwordControl?.value == confirmPasswordControl?.value) {
    return null;
  }
  else{
     confirmPasswordControl?.setErrors({passwordMatch: 'password and confirm password not match'})
     return {passwordMatch: 'password and confirm password not match'};
  }
}

  toggleSee(){
    this.hidepass = !this.hidepass;
  }
  toggleSeePassword(){
    this.hidePassword = !this.hidePassword;
  }
}
