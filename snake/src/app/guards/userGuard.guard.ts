import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
  const customerService = inject(UserService);
  const router = inject(Router);
  if (customerService.isAuthenticated()) {
    return true;
  } else {
    return router.navigateByUrl('/intro');
  }
};
