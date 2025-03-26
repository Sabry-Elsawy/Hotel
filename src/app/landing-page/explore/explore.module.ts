import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreComponent } from './explore.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search.pipe';


@NgModule({
  declarations: [
    ExploreComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    ExploreRoutingModule,
    FormsModule
  ]
})
export class ExploreModule { }
