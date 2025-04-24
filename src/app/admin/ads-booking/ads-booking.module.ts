import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdsBookingRoutingModule } from './ads-booking-routing.module';
import { AdsComponent } from './ads/ads.component';
import { BookingComponent } from './booking/booking.component';
import { NotfoundComponent } from '../../shared/notfound/notfound.component';
 


@NgModule({
  declarations: [
    AdsComponent,
    BookingComponent,
    NotfoundComponent
  ],
  imports: [
    CommonModule,
    AdsBookingRoutingModule,
 
  ]
})
export class AdsBookingModule { }
