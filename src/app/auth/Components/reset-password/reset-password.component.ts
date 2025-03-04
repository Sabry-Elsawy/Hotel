import { Component } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
hidepass:boolean=true;


  toggleSee(){
    this.hidepass = !this.hidepass;
  }
}
