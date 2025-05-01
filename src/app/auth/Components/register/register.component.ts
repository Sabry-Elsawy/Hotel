import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegxPassword } from '../login/login.component';
import { RegxPhoneNumber, RegxUserName } from '../../../core/service/helper.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
 
  
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  hidepass:boolean = true;
  hidePassword:boolean = true;
  selectedFile: File | null = null; 
  profileImage = signal<string | null>(null);
  errorMessage:string='';
  constructor(private _AuthService:AuthService , private _Router:Router , private _Spinner:NgxSpinnerService){}
  onFileSelected(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];

    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage.set(reader.result as string);
      };
      reader.readAsDataURL(file);

      
    }
  }

  registerForm =new FormGroup({
    userName:new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(15),Validators.pattern(RegxUserName)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    country: new FormControl(null, [Validators.required ],),
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern(RegxPhoneNumber)]),
    password: new FormControl(null, [Validators.required,Validators.pattern(RegxPassword)]),
    confirmPassword: new FormControl(null, [Validators.required,Validators.pattern(RegxPassword)]),
    role: new FormControl(null, [Validators.required]),
    profileImage: new FormControl('',),
  },{validators : this.confirmPassword});

  onRegister(data: FormGroup){
    this._Spinner.show();
    console.log(data);
  const registerFormData = new FormData();
  registerFormData.append('userName',data.value.userName);
  registerFormData.append('email', data.value.email);
  registerFormData.append('country', data.value.country);
  registerFormData.append('phoneNumber', data.value.phoneNumber);
  registerFormData.append('password', data.value.password);
  registerFormData.append('confirmPassword', data.value.confirmPassword);
  registerFormData.append('role', data.value.role);
  if (this.selectedFile instanceof File) {
    registerFormData.append('profileImage', this.selectedFile);
  } 

    this._AuthService.onRegister(registerFormData).subscribe({
      next:(response)=>{
        console.log(response);
        
      },
      error:(err)=>{
        console.log(err);
        this._Spinner.hide();
        this.errorMessage=err.error.message;
      },
      complete:()=>{
        this._Spinner.hide();
        console.log("Done");
        this._Router.navigate(["/Auth/login"])
      }
    })
    
  }

  confirmPassword(registerForm:any){
      let passwordControl= registerForm.get('password')
      let confirmPasswordControl= registerForm.get('confirmPassword')
      if (passwordControl?.value == confirmPasswordControl?.value) {
        return null;
      }
      else{
         confirmPasswordControl?.setErrors({passwordMatch: 'password and confirm password not match'})
         return {passwordMatch: 'password and confirm password not match'};
      }
  }

  // removeProfileImage(event : Event){
  //   event.preventDefault();
  //   event.stopPropagation();
  //   this.profileImage.set(null);
  // }
  toggleSee(){
    this.hidepass = !this.hidepass;
  }
  toggleSeeConfirm(){
    this.hidePassword = !this.hidePassword;
  }

}
