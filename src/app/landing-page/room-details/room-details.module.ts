import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomDetailsRoutingModule } from './room-details-routing.module';
import { RoomDetailsComponent } from './room-details.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
 


@NgModule({
  declarations: [
    RoomDetailsComponent,
    BookingFormComponent,
 
  ],
  imports: [
    CommonModule,
    RoomDetailsRoutingModule
  ]
})
export class RoomDetailsModule { }
