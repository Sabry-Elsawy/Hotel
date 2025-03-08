import { Component, OnInit } from '@angular/core';
import { AdsUserService } from '../services/ads-service/ads-user.service';
import { IAds } from '../../core/model/ads';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
capacity:number=0;
tableData: any;
tableUserAds: IAds[] = [];
constructor(private _AdsUserService:AdsUserService) { }
ngOnInit(): void {
 this.getAllAds(this.tableUserAds)
 
}
increasementCapacity(){
  this.capacity++;  
}
decreasementCapacity(){
   if (this.capacity>0){
     this.capacity--;
    
   }
}
getAllAds(data:any){
  this._AdsUserService.getAllAds(data).subscribe({
    next: (response) => {
      this.tableData = response;
      this.tableUserAds = response.data.ads.slice(0,5);
    },
    error: (err) => {
      console.log(err);
    },
    complete: () => {
      console.log('complete');
    }
  });

}

}
