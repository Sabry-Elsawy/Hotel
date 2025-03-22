import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReviewsService } from '../../services/reviews-service/reviews.service';
import { NgxSpinnerService } from 'ngx-spinner';
  
@Component({
  selector: 'app-form-comment',
  templateUrl: './form-comment.component.html',
  styleUrl: './form-comment.component.scss'
})
export class FormCommentComponent implements OnInit{
  constructor(private _ReviewsService:ReviewsService , private _NgxSpinnerService:NgxSpinnerService){}
@Input() roomId:string='';
  stars:number[]=[1,2,3,4,5];
  reLoadingInput = document.querySelector('.reloading')
  userInput: string = '';  
  maxChars: number = 200;  
  charCount: number = 0;  
  isLimitReached: boolean = false;
  loadingWidth:number=0;  
  commentForm!:FormGroup;
  ngOnInit(): void {
    this.initForm()
  }
  initForm():void{
      this.commentForm=new FormGroup({
      roomId:new FormControl(this.roomId , [Validators.required]),
      comment:new FormControl(null , [Validators.required , Validators.minLength(5)])
    })
  
  }
 
  submitForm():void{
    if (this.commentForm.valid) {
      this._NgxSpinnerService.show()
      this._ReviewsService.addComment(this.commentForm.value).subscribe({
        next:(response)=>{
       //   console.log(response);
          
        },
        error:(err)=>{
          console.log(err);
          this._NgxSpinnerService.hide()
        },
        complete:()=>{
        //  console.log("Done add comment");
          this._NgxSpinnerService.hide()
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
}
