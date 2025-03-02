import {ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
constructor(private _AuthService:AuthService){

}


loginForm = new FormGroup({
  email: new FormControl('',[Validators.required,Validators.email]),
  password: new FormControl('',[Validators.required,Validators.pattern(RegxPassword)]),
});

handleForm(data:FormGroup):void{
  console.log(data.value);
  this._AuthService.onLogin(data.value).subscribe({
    next:(responce)=>{
      console.log(responce);
      localStorage.setItem('token', JSON.stringify(responce.data.token));
      localStorage.setItem('userName', JSON.stringify(responce.data.user.userName));
      localStorage.setItem('role', JSON.stringify(responce.data.user.role));

    },
    error:(err)=>{
      console.log(err);
      this.errorMessage=err.error.message;
    },
    complete:()=>{
      console.log('complete');
    }
  })
   
}


toggleSee(){
  this.hidepass = !this.hidepass;
}

}
