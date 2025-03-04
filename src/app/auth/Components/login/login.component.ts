import {ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
 
export const RegxPassword: RegExp = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
hidepass:boolean = true;
errorMessage:string = '';
roleUser:string='';
constructor(private _AuthService:AuthService, private _Router:Router){
 
}


loginForm = new FormGroup({
  email: new FormControl(null,[Validators.required,Validators.email]),
  password: new FormControl(null,[Validators.required,Validators.pattern(RegxPassword)]),
});

handleForm(data:FormGroup):void{
  console.log(data.value);
  this._AuthService.onLogin(data.value).subscribe({
    next:(responce)=>{
      console.log(responce);
      this.roleUser=responce.data.user.role
      localStorage.setItem('token',  responce.data.token);
      localStorage.setItem('userName',  responce.data.user.userName);
      localStorage.setItem('role',  responce.data.user.role);

    },
    error:(err)=>{
      console.log(err);
      this.errorMessage=err.error.message;
    },
    complete:()=>{
      console.log('complete');
    if (this.roleUser == 'admin') {
      this._Router.navigate(['/admin'])
    }
    else
    {
      this._Router.navigate(['/landing-page'])
    }
    }
  })
   
}


toggleSee(){
  this.hidepass = !this.hidepass;
}

}
