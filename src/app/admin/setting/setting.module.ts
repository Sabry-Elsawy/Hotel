import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { SharedModule } from '../../shared/shared.module';
 
 


@NgModule({
  declarations: [
    ChangePassComponent,
    FeedbackComponent,
    ProfileComponent,
    
 
  
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    
  ]
})
export class SettingModule { }
