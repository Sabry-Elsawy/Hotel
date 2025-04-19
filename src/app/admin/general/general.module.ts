import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { FormsModule } from '@angular/forms';
import { SearchUserPipe } from '../../shared/pipes/search-user.pipe';


@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    SearchUserPipe
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    FormsModule
  ]
})
export class GeneralModule { }
