import { Component, OnChanges, OnInit } from '@angular/core';
import { ReviewsService } from '../../services/reviews-service/reviews.service';
import { IRoomReview } from '../../../core/model/room';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-review',
  templateUrl: './all-review.component.html',
  styleUrl: './all-review.component.scss'
})
export class AllReviewComponent implements OnInit , OnChanges {
  roomReviews:IRoomReview[]=[];
  roomId:string=''
  constructor(private _ReviewsService:ReviewsService , private _ActivatedRoute:ActivatedRoute){}
  star: number[] = [1, 2, 3, 4, 5]; 

ngOnInit(): void {
  this.getRoomId();
  this.getAllReviews();
}
ngOnChanges(){
  this.getAllReviews()
}

getAllReviews( ):void{
this._ReviewsService.getRoomReviews(this.roomId).subscribe({
  next:(response)=>{
    console.log(response);
    this.roomReviews=response.data.roomReviews
  },
  error:(err)=>{
    console.log(err);
    
  },
  complete:()=>{
    console.log("done get all review");
    
  }
})
}


getRoomId():void{
 this.roomId= this._ActivatedRoute.snapshot.params['id']
}




}
