import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ExploreComponent } from './explore/explore.component';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';

@NgModule({
  declarations: [
    LandingPageComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ExploreComponent
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    MatMenuModule,
    MatMenuTrigger
  ]
})
export class LandingPageModule { }
