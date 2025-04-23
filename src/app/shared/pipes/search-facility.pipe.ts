import { Pipe, PipeTransform } from '@angular/core';
import { IFacility } from '../../core/model/room';

@Pipe({
  name: 'searchFacility'
})
export class SearchFacilityPipe implements PipeTransform {

  transform(facilities:IFacility[],  searchTerm: string): IFacility[] | null {
    if (!facilities || !searchTerm) {
      return facilities; // Return all facilities if no search term is provided
    }
   


    return facilities.filter(facility=>facility.name.toLowerCase().includes(searchTerm.toLowerCase())); // Filter facilities based on the search term
  }

}
