import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
  
export const userGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router)
  if (localStorage.getItem('token') !== null && localStorage.getItem('role') == 'user') {
    return true;
  }else
  {
      _Router.navigate(['/Auth/login'])
    return false;
  }
  
};
