import { Component, Input, OnInit } from '@angular/core';
import { IRoom } from '../../../core/model/room';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '../../services/Booking/booking.service';
import { NgxSpinnerService } from 'ngx-spinner';
  
@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss'
})
export class BookingFormComponent implements OnInit{
@Input() roomData!: IRoom;

bookingForm!: FormGroup;
minDate = new Date();

constructor(  private _Router: Router , private _BookingService:BookingService , private _NgxSpinnerService:NgxSpinnerService) { }

ngOnInit(): void {
  this.initForm();
}

// Initializes the booking form with required fields and validation
initForm() {
  this.bookingForm = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    totalPrice: new FormControl(0, [Validators.required]),
    room: new FormControl(`${this.roomData._id}`, [Validators.required]),
  }  , { validators: this.dateRangeValidator.bind(this)}
  )
}

// Handles form submission and starts the booking process
onSubmit() {
  if (this.bookingForm.valid && this.roomData && !this.roomData.isBooked) {
    const bookingData = {
      ...this.bookingForm.value,
      totalPrice: this.calculateTotalPrice()
    };
this._NgxSpinnerService.show();
    this._BookingService.startBooking(bookingData).subscribe({
      next:(response)=>{
        this._Router.navigate(['/landing-page/payment/pay'])
      },
      error:(err)=>{
        console.log(err);
        this._NgxSpinnerService.hide();
      },
      complete:()=>{
        this._NgxSpinnerService.hide();
      }
    })
     
  }
}

// Calculates the discounted price based on the original price and discount percentage
calculateDiscountedPrice(price: number, discount: number): number {
  return price - (price * discount / 100);
}

// Calculates the total number of nights booked
calculateNights(): number {
  const startDate = this.bookingForm.get('startDate')?.value;
  const endDate = this.bookingForm.get('endDate')?.value;

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }
  return 0;
}

// Calculates the total price based on the number of nights and room price per night
calculateTotalPrice(): number {
  if (!this.roomData) return 0;

  const nights = this.calculateNights();
  const pricePerNight = this.calculateDiscountedPrice(this.roomData.price, this.roomData.discount);
  return nights * pricePerNight;
}
  // Custom validator to ensure the start date is before the end date
  dateRangeValidator(formGroup: AbstractControl): ValidationErrors | null {
    const startDate = formGroup.get('startDate')?.value;
    const endDate = formGroup.get('endDate')?.value;

    if (!startDate || !endDate) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);

    return start < end ? null : { dateRangeInvalid: true };
  }
}
