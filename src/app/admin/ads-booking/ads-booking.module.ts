import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdsBookingRoutingModule } from './ads-booking-routing.module';
import { AdsComponent } from './ads/ads.component';
import { BookingComponent } from './booking/booking.component';
import { SharedModule } from '../../shared/shared.module';
 
 


@NgModule({
  declarations: [
    AdsComponent,
    BookingComponent,
 
  ],
  imports: [
    CommonModule,
    AdsBookingRoutingModule,
    SharedModule
 
  ]
})
export class AdsBookingModule { }
