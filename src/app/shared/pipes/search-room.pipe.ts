import { Pipe, PipeTransform } from '@angular/core';
import { IRoom } from '../../core/model/room';

@Pipe({
  name: 'searchRoom'
})
export class SearchRoomPipe implements PipeTransform {

   transform( rooms:IRoom[],  searchInput:number): IRoom[] {
     if (!rooms || !searchInput) {
       return rooms;
     }
 
     return rooms.filter(room=> room.capacity  == searchInput)
   }

}
