import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { NotfoundComponent } from './notfound/notfound.component';
 
 
 
 
@NgModule({
  declarations: [
    SharedComponent,
    NotfoundComponent,
 
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
 
 
  ],
  exports: [
    NotfoundComponent,
 
  ]
})
export class SharedModule { }
