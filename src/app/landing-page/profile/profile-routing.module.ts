import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { NotfoundComponent } from '../../shared/notfound/notfound.component';

const routes: Routes = [
  {path:'' , redirectTo:'info' , pathMatch:'full'},
  {path:'info' , component:InfoComponent , title:'profile'},
  {path:'**' , component:NotfoundComponent , title:'Error 404'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
