import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  {path:'', redirectTo:'review' ,pathMatch:'full'},
  {path:'review/:id' , component:ReviewComponent , title:'reviews'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewsRoutingModule { }
