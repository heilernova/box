import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { APP_CONFIG } from '../init-config';
import { IResponseAPI } from '../config.interfaces';

@Injectable()
export class AppResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    context.switchToHttp().getResponse<Response>().setHeader('X-Robots-Tag', 'noindex');
    context.switchToHttp().getResponse<Response>().setHeader('robots', 'noindex');
    context.switchToHttp().getResponse<Response>().setHeader('Disallow', '/');
    if (context.switchToHttp().getRequest<Request>().url.startsWith('/media')){
      return next.handle();
    }
    return next.handle().pipe(map(value => {
      return {
        name: 'Box',
        version: APP_CONFIG.version,
        statusCode: context.switchToHttp().getResponse<Response>().statusCode,
        developer: {
          name: "Heiler Nova",
          homepage: "https://www.novah.dev/devs/heilernova"
        },
        data: value,
        links: [
          "https://box.novah.dev",
          "https://www.novah.dev"
        ]
      } as IResponseAPI
    }));
  }
}