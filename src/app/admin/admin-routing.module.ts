import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  { path: '', component: AdminComponent , children:[
    {path:'', redirectTo: 'general', pathMatch: 'full'},
    {path:'general', loadChildren:()=>import('./general/general.module').then(m=>m.GeneralModule)},
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
