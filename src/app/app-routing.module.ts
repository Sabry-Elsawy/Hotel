import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin/admin.guard';
import { userGuard } from './core/guards/user/user.guard';

const routes: Routes = [
  {path:'', redirectTo:'Auth', pathMatch:'full'},
  {path:'Auth', loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),canActivate:[adminGuard] },
  { path: 'landing-page', loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule) ,canActivate:[userGuard]},
  { path: 'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },
  
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
