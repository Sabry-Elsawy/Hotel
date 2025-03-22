import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewsRoutingModule } from './reviews-routing.module';
import { ReviewComponent } from './review/review.component';
import { FormReviewComponent } from './form-review/form-review.component';
import { FormCommentComponent } from './form-comment/form-comment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllReviewComponent } from './all-review/all-review.component';


@NgModule({
  declarations: [
    ReviewComponent,
    FormReviewComponent,
    FormCommentComponent,
    AllReviewComponent
  ],
  imports: [
    CommonModule,
    ReviewsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReviewsModule { }
