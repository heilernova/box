import { JWTService } from '@app/common/jwt';
import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ISessionData } from './session.interfaces';
import { AppSession } from './session.model';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from './permission.decorator';

@Injectable()
export class SessionAuthGuard implements CanActivate {
  constructor(private readonly _jwt: JWTService, private reflector: Reflector){}
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
      let session = new AppSession(data, token);
      context.switchToHttp().getRequest<Request&{ appSession: AppSession }>().appSession = session;
      const requiredPermissions: string[] | undefined | null = this.reflector.getAllAndOverride<string[]>(PERMISSION_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
  
      if (requiredPermissions && requiredPermissions.length > 0){
        return session.checkPermissions(requiredPermissions);
      }

    } catch (error) {
      throw new HttpException("Token invalido", 401);
    }
    return true;
  }
}
