import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdsComponent } from './ads/ads.component';
import { BookingComponent } from './booking/booking.component';
import { NotfoundComponent } from '../../shared/notfound/notfound.component';

const routes: Routes = [
  {path:'' , redirectTo:'ads' , pathMatch:'full'},
  {path:'ads' ,component:AdsComponent , title:'Ads'},
  {path:'Booking' , component:BookingComponent , title:'Booking'},
  {path:'**' , component:NotfoundComponent , title:'Not Found'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdsBookingRoutingModule { }
