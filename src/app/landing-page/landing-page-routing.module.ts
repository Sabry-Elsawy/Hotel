import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';
import { NotfoundComponent } from '../shared/notfound/notfound.component';
import { HomeComponent } from './home/home.component';
 

const routes: Routes = [
  { path: '', component: LandingPageComponent ,children:[
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path:'home' , component:HomeComponent,title:'Home'},
    {path:'explore' ,  loadChildren:()=>import('./explore/explore.module').then(m=>m.ExploreModule)},
    { path: 'favorite', loadChildren: () => import('./favorite/favorite.module').then(m => m.FavoriteModule) },
    {path:'**' , component: NotfoundComponent}
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
