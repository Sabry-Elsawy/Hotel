import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { FeedbackComponent } from './feedback/feedback.component';

const routes: Routes = [
  {path: '' , redirectTo: 'profile' , pathMatch: 'full'},
  {path:'profile' , component: ProfileComponent , title: 'Profile'},
  {path:'settings' , component:ChangePassComponent , title: 'settings'},  
  {path:'feedback' , component:FeedbackComponent , title: 'Feedback'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
