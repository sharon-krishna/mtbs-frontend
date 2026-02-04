import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';


function decodeToken(token: string): any {
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload));
}

export const roleGuard: CanActivateFn = () => {
    const router = inject(Router)
    const token = localStorage.getItem('access')
    
    if (!token) {
    router.navigateByUrl('/login');
    return false;
  }
  
  const decoded = decodeToken(token)
  
  if (decoded.role !== 'ADMIN') {
    router.navigateByUrl('/');
    return false;
  }

  return true;
};
