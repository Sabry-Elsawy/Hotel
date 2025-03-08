import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
capacity:number=0;

increasementCapacity(){
  this.capacity++;  
}
decreasementCapacity(){
   if (this.capacity>0){
     this.capacity--;
    
   }
}

}
