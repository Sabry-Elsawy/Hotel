import { Component, signal } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Hotel';
  // constructor(private spinner: NgxSpinnerService) {
 
  //   this.spinner.show();

  //   setTimeout(() => {
 
  //     this.spinner.hide();
  //   }, 3000);
  // }
 
}
