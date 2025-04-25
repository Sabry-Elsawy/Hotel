import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
 
 


@NgModule({
  declarations: [
    ChangePassComponent,
    FeedbackComponent,
    ProfileComponent,
 
  
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    ReactiveFormsModule
  ]
})
export class SettingModule { }
