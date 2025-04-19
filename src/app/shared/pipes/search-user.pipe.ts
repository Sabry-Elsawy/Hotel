import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../core/model/admin/user';

@Pipe({
  name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

  transform(users: User[], searchItem: string): User[] {
    return users.filter((user)=>user.userName.toLocaleLowerCase().includes(searchItem.toLocaleLowerCase()) || user.email.toLocaleLowerCase().includes(searchItem.toLocaleLowerCase()));
  }

}
