import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdsBookingRoutingModule } from './ads-booking-routing.module';
import { AdsComponent } from './ads/ads.component';
import { BookingComponent } from './booking/booking.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormatDatePipe } from '../../shared/pipes/format-date.pipe';
  
 


@NgModule({
  declarations: [
    AdsComponent,
    BookingComponent,
    FormatDatePipe
   
 
  ],
  imports: [
    CommonModule,
    AdsBookingRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    
    
 
  ]
})
export class AdsBookingModule { }
