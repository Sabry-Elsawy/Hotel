import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';
import { NotfoundComponent } from '../shared/notfound/notfound.component';
import { HomeComponent } from './home/home.component';
import { userGuard } from '../core/guards/user/user.guard';
 

const routes: Routes = [
  { path: '', component: LandingPageComponent ,children:[
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path:'home' ,canActivate:[userGuard], component:HomeComponent,title:'Home'},
    {path:'explore' , canActivate:[userGuard], loadChildren:()=>import('./explore/explore.module').then(m=>m.ExploreModule),title:'explore'},
    { path: 'favorite',canActivate:[userGuard], loadChildren: () => import('./favorite/favorite.module').then(m => m.FavoriteModule),title:'favorite' },
    {path:'room-details/:id',canActivate:[userGuard], loadChildren:()=>import('./room-details/room-details.module').then(m=>m.RoomDetailsModule)  },
    {path:'reviews',canActivate:[userGuard], loadChildren:()=>import('./reviews/reviews.module').then(m =>m.ReviewsModule)},
    {path:'profile' ,canActivate:[userGuard], loadChildren:()=>import('./profile/profile.module').then(m=>m.ProfileModule)},
    {path:'payment' ,canActivate:[userGuard], loadChildren:()=>import('./payment/payment.module').then(m=>m.PaymentModule)},
    {path:'**' , component: NotfoundComponent}
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
