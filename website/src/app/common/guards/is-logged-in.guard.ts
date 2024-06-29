import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../session';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const session = inject(SessionService);
  const router = inject(Router);
  return session.getUser() ? true : router.createUrlTree(['/']);
};
