import { JWTService } from '@app/common/jwt';
import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ISessionData } from './session.interfaces';
import { AppSession } from './session.model';

@Injectable()
export class SessionAuthGuard implements CanActivate {
  constructor(private readonly _jwt: JWTService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let token: string;
    let authorization: string | undefined = context.switchToHttp().getRequest<Request>().headers['authorization'];
    if (!authorization){
      throw new HttpException("Se requiere autorización", 401);
    }
    token = authorization.substring(7);
    try {
      let data: ISessionData = this._jwt.verify(token);
      context.switchToHttp().getRequest<Request&{ appSession: AppSession }>().appSession = new AppSession(data, token);
    } catch (error) {
      throw new HttpException("Token invalido", 401);
    }
    return true;
  }
}
