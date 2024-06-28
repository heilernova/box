import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { inject } from '@angular/core';
import { SessionService } from '../session';
import { catchError, map, throwError } from 'rxjs';
import { MessageService } from '@app/ui/message';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const message = inject(MessageService);
  const session = inject(SessionService);
  let headers = req.headers;

  let user = session.getUser();
  if (user){
    headers = headers.append('authorization', `Bearer ${user.token}`);
  }


  return next(req.clone({ url: `${environment.urlAPI}/${req.url}`, headers })).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse){
        if ( typeof error.error.message == 'string'){
          message.error(error.error.message);
        }
      }
      return throwError(() => error);
    })
  );
};
