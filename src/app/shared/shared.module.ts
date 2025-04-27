import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardNavComponent } from './dashboard-nav/dashboard-nav.component';
//import { SearchAdsPipe } from './pipes/search-ads.pipe';
//import { SearchBookingPipe } from './pipes/search-booking.pipe';
//import { DatePipe } from './pipes/date.pipe';
//import { DateandtimePipe } from './pipes/dateandtime.pipe';
//import { FormatDatePipe } from './pipes/format-date.pipe';
//import { SearchFacilityPipe } from './pipes/search-facility.pipe';
//import { SearchRoomPipe } from './pipes/search-room.pipe';
//import { SearchUserPipe } from './pipes/search-user.pipe';
 
 
 
 
@NgModule({
  declarations: [
    SharedComponent,
    NotfoundComponent,
    SidebarComponent,
    DashboardNavComponent,
  //  SearchAdsPipe,
   // SearchBookingPipe,
  //  DatePipe,
   // DateandtimePipe,
 //   FormatDatePipe,
  //  SearchFacilityPipe,
 //   SearchRoomPipe,
  //  SearchUserPipe,
 
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
 
 
  ],
  exports: [
    NotfoundComponent,
    SidebarComponent,
    DashboardNavComponent
 
  ]
})
export class SharedModule { }
