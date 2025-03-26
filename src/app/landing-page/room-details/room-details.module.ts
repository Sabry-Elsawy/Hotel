import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomDetailsRoutingModule } from './room-details-routing.module';
import { RoomDetailsComponent } from './room-details.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { ReactiveFormsModule } from '@angular/forms';
 


@NgModule({
  declarations: [
    RoomDetailsComponent,
    BookingFormComponent,
 
  ],
  imports: [
    CommonModule,
    RoomDetailsRoutingModule,
    ReactiveFormsModule
  ]
})
export class RoomDetailsModule { }
