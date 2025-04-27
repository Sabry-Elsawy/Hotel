import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { NotfoundComponent } from '../../shared/notfound/notfound.component';

const routes: Routes = [
  {path:'' , redirectTo:'pay' , pathMatch:'full'},
  {path:'pay/:id' ,component:PaymentComponent , title:'payment'},
  {path:'**' , component:NotfoundComponent , title:'Error 404'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
