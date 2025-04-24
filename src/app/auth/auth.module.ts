import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { NotfoundComponent } from '../shared/notfound/notfound.component';
import { SharedModule } from '../shared/shared.module';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { LandingPageModule } from "../landing-page/landing-page.module";
  
   
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
 
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
  
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    LandingPageModule
]
})
export class AuthModule { }
