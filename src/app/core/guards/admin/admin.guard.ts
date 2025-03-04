import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
 
export const adminGuard: CanActivateFn = (route, state) => {
  const _Router=inject(Router)
  if (localStorage.getItem('token') !==null && localStorage.getItem('role') == 'admin') {
    return true;
  }
  else{
    if (localStorage.getItem('token') !==null && localStorage.getItem('role') == 'user' ) {
      _Router.navigate(['/landing-page'])
    }else{
      _Router.navigate(['/Auth/login'])
    }


    return false;
  }
  
};
