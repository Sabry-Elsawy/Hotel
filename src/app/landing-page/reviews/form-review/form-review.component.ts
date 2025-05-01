import { Component, Input, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReviewsService } from '../../services/reviews-service/reviews.service';
import { ToastrService } from 'ngx-toastr';
 
@Component({
  selector: 'app-form-review',
  templateUrl: './form-review.component.html',
  styleUrl: './form-review.component.scss'
})
export class FormReviewComponent implements OnInit {
  constructor(private _NgxSpinnerService:NgxSpinnerService , private _ReviewsService:ReviewsService , private _ToastrService:ToastrService){}
  @Input() roomId: string = '';
stars:number[]=[1,2,3,4,5];
userInput: string = '';  
maxChars: number = 200;  
charCount: number = 0;  
isLimitReached: boolean = false;
loadingWidth:number=0;  
rating:number=0;
hoverRating:number=0;
starStates: string[] = ['inactive', 'inactive', 'inactive', 'inactive', 'inactive'];
formReview!: FormGroup;
 
ngOnInit(): void {
  this.initForm();
}
 
initForm():void{
  this.formReview=new FormGroup({
    roomId:new FormControl(this.roomId , [Validators.required]),
    rating:new FormControl(0,[Validators.required , Validators.min(1)]),
    review:new FormControl(null,[Validators.required ,Validators.minLength(5)])
  })
}


submitForm():void{
  if (this.formReview.valid) {   
    this._NgxSpinnerService.show();
     this._ReviewsService.setReview(this.formReview.value).subscribe({
      next:(response)=>{
        console.log(response);
     this._ToastrService.success(response.message, '', { toastClass: 'custom-toast toast-success' });
        this.restForm()
      },
      error:(err)=>{
        console.log(err);
        this._NgxSpinnerService.hide();
        this._ToastrService.error(err.error.message);
        this.restForm()
      },
      complete:()=>{
       // console.log("Done set review");
       
        window.location.reload(); 
        this._NgxSpinnerService.hide();
      }
     })
    
  }
}

updateCharCount() {
  this.charCount = this.userInput.length;
  this.loadingWidth =this.charCount / 2 ;
  this.isLimitReached = this.charCount >= this.maxChars;
 
 
  if (this.charCount > this.maxChars) {
    this.userInput = this.userInput.substring(0, this.maxChars);
    this.charCount = this.maxChars;
  }
}
getLoadingWidth(): string {
  return `${this.loadingWidth}px`;  
}
getBackgroundColor(): string {
  if (this.charCount < 130) {
    return '#3252df';  
  } else if (this.charCount < 180) {
    return 'orange'; 
  } else {
    return 'red';  
  }
}

// function to set the selected rating
setRating(star:number):void{
  this.rating=star;
  this.formReview.patchValue({rating:star});
this.updateStarStatus();
}
  // Function to handle star hover effect
  setHoverRating(star: number): void {
    this.hoverRating = star;
    this.updateStarStatus();
  }
  // Function to reset the hover effect when the mouse leaves the stars
  resetHoverRating(): void {
    this.hoverRating = 0;
    this.updateStarStatus();
  }

updateStarStatus():void{
  const activeRating = this.hoverRating || this.rating;
  this.starStates =this.stars.map(star=>star<= activeRating ? 'active' : 'inactive');
}

restForm():void{
  this.formReview.reset({roomId:this.roomId, rating:0, review: ''});
this.rating=0;
this.updateStarStatus();
}

}
