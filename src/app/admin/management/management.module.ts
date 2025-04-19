import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { RoomsComponent } from './rooms/rooms.component';
import { ManageRoomComponent } from './manage-room/manage-room.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { SearchRoomPipe } from '../../shared/pipes/search-room.pipe';
import { FormsModule } from '@angular/forms';
 


@NgModule({
  declarations: [
    RoomsComponent,
    ManageRoomComponent,
    FacilitiesComponent,
    SearchRoomPipe
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    FormsModule
  ]
})
export class ManagementModule { }
