import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
//import { SearchUserPipe } from './pipes/search-user.pipe';
 
 
 
 
@NgModule({
  declarations: [
    SharedComponent,
    NotfoundComponent,
    SidebarComponent,
  //  SearchUserPipe,
 
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
 
 
  ],
  exports: [
    NotfoundComponent,
    SidebarComponent
 
  ]
})
export class SharedModule { }
