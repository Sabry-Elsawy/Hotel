import {ChangeDetectionStrategy, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
 
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
 

@NgModule({
  declarations: [
    LandingPageComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
 
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    MatMenuModule,
    MatMenuTrigger,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CarouselModule,
 
 
     
  ],
  exports:[
    NavbarComponent,
    FooterComponent
  ],
  providers: [
    provideNativeDateAdapter()
  ],
})
export class LandingPageModule { }
