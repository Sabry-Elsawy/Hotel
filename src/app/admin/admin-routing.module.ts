import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { adminGuard } from '../core/guards/admin/admin.guard';

const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  { path: '', component: AdminComponent , children:[
    {path:'' , redirectTo: 'general', pathMatch: 'full'},
    {path:'general',canActivate:[adminGuard] ,  loadChildren:()=>import('./general/general.module').then(m=>m.GeneralModule)},
    {path:'management' ,canActivate:[adminGuard] ,  loadChildren:()=>import('./management/management.module').then(m=>m.ManagementModule)},
    {path:'ads-Booking' ,canActivate:[adminGuard] ,  loadChildren:()=>import('./ads-booking/ads-booking.module').then(m=>m.AdsBookingModule)},
    {path:'setting',canActivate:[adminGuard] ,  loadChildren:()=>import('./setting/setting.module').then(m=>m.SettingModule)}
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
