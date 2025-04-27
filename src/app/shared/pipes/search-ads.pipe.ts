import { Pipe, PipeTransform } from '@angular/core';
import { IAds } from '../../core/model/ads';

@Pipe({
  name: 'searchAds'
})
export class SearchAdsPipe implements PipeTransform {

  transform(ads: IAds[], searchTerm: string): IAds[] {
    if (!ads || !searchTerm) return ads;

    return ads.filter(item =>
      item.isActive.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

}
