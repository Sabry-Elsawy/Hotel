import { Component } from '@angular/core';

@Component({
  selector: 'app-form-review',
  templateUrl: './form-review.component.html',
  styleUrl: './form-review.component.scss'
})
export class FormReviewComponent {
stars:number[]=[1,2,3,4,5];
reLoadingInput = document.querySelector('.reloading')
userInput: string = '';  
maxChars: number = 200;  
charCount: number = 0;  
isLimitReached: boolean = false;
loadingWidth:number=0;  

 
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
