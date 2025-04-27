import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import { ManageRoomComponent } from './manage-room/manage-room.component';
import { FacilitiesComponent } from './facilities/facilities.component';

const routes: Routes = [
  {path: '' , redirectTo:'rooms' , pathMatch:'full'},
  {path: 'rooms' , component:RoomsComponent , title:'Rooms'},
  {path:'manage-room' , component:ManageRoomComponent , title:'Add Room'},
  {path:'manage-room/:id' , component:ManageRoomComponent , title:'Edit Room'},
  {path:'facilities' , component:FacilitiesComponent , title:'Facilities'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
