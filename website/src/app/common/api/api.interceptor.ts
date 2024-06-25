import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { inject } from '@angular/core';
import { SessionService } from '../session';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const session = inject(SessionService);
  let headers = req.headers;

  let user = session.getUser();
  if (user){
    headers = headers.append('authorization', `Bearer ${user.token}`);
  }


  return next(req.clone({ url: `${environment.urlAPI}/${req.url}`, headers }));
};
