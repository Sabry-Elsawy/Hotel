import { Component, Input } from '@angular/core';
import { IRoom } from '../../../core/model/room';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss'
})
export class BookingFormComponent {
@Input() roomData!: IRoom;
}
