import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatdate2'
})
export class DatePipe implements PipeTransform {

  transform(value: string, format: string='dd/MM/yyyy HH:mm'): string {
    if (!value) {
      return '';
    }

    const date = new Date(value);
    return new Intl.DateTimeFormat('en-US', { 
           day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(date);
  }

}
