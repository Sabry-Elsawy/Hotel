import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent implements OnInit {
  roomId:string='';
constructor(private _ActivatedRoute:ActivatedRoute){}
ngOnInit(): void {
  this.getRoomId()
}
getRoomId(){
  this.roomId=this._ActivatedRoute.snapshot.params['id']
}
}
