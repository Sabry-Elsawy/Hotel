import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { RoomsComponent } from './rooms/rooms.component';
import { ManageRoomComponent } from './manage-room/manage-room.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { SearchRoomPipe } from '../../shared/pipes/search-room.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

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
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ]
})
export class ManagementModule { }
