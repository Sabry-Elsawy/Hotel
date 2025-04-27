import { Pipe, PipeTransform } from '@angular/core';
import { IBooking } from '../../core/model/admin/booking';

@Pipe({
  name: 'searchBooking'
})
export class SearchBookingPipe implements PipeTransform {
  transform(item: IBooking[], searchTerm: string): IBooking[] {
    if (!item || !searchTerm) return item;

    return item.filter(item =>
      item.room.roomNumber.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

}
