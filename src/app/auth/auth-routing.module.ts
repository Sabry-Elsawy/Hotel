import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
 
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { NotfoundComponent } from '../shared/notfound/notfound.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent, title:'Login'} ,
  {path:'register',component:RegisterComponent, title:'Register'},
  {path:'forgot-password', component:ForgotPasswordComponent , title:'forgot-password'},
  {path:'reset-password' , component:ResetPasswordComponent , title:'reset-password'},
  {path:'change-pass' , component:ChangePasswordComponent , title:'change-password'},
  {path:'**' , component:NotfoundComponent , title:'Not Found'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
