import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
 
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
errorMassage:string='';
  constructor(private _AuthService:AuthService, private _Router:Router , private _Spinner:NgxSpinnerService ) { }



  forgotPasswordForm:FormGroup= new FormGroup({
    email:new FormControl(null , [Validators.required , Validators.email] )
  })


  sendOTP(data :FormGroup){
     //console.log(data);
     this._Spinner.show();
     this._AuthService.onForgotPassword(data.value).subscribe({
      next:(res)=>{
        console.log(res);
        this._Router.navigate(['/Auth/reset-password']);
      },
      error:(err)=>{
        console.log(err);
        this._Spinner.hide();
        this.errorMassage=err.error.message;
        console.log(
          this.errorMassage
        );
        
      },
      complete:()=>{
        this._Spinner.hide();
        console.log('complete');
      }
        
     });
  }

   
}
