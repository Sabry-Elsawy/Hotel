import { Component } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {
  rating: number = 0;
  hoverRating: number = 0;
  feedback: string = '';
  submitted: boolean = false;
  showError: boolean = false;

  getRatingText(): string {
    const texts = [
      'Select your rating',
      'Poor',
      'Fair',
      'Good',
      'Very Good',
      'Excellent'
    ];
    return texts[this.rating];
  }

  setRating(value: number): void {
    this.rating = value;
    this.showError = false;
  }

  isValidForm(): boolean {
    return this.rating > 0 && this.feedback.trim().length >= 10;
  }

  submitFeedback(): void {
    this.showError = true;
    
    if (this.isValidForm()) {
      this.submitted  = true;
    }
  }

  resetForm(): void {
    this.rating = 0;
    this.hoverRating = 0;
    this.feedback = '';
    this.submitted = false;
    this.showError = false;
  }
}
