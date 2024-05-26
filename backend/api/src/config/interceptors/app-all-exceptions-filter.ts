import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { DatabaseError } from 'pg';
import { IResponseErrorAPI } from '../config.interfaces';
import { APP_CONFIG } from '../init-config';


@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        let body: IResponseErrorAPI = {
            name: "Box",
            version: APP_CONFIG.version,
            statusCode: 500,
            developer: {
                name: "Heiler Nova",
                homepage: "https://www.novah.dev/devs/heilernova"
            },
            message: 'Error interno del servidor',
            detail: undefined,
            links: [
                "https://box.novah.dev",
                "https://www.novah.dev"
            ]
        }

        if (process.env.NODE_ENV == 'development'){
            if (exception instanceof HttpException){
                let res = exception.getResponse();
                body.statusCode = exception.getStatus();
                if (typeof res == 'string'){
                    body.message = res;
                } else {
                    body.message = (res as any).message;
                    (res as any).message = undefined;
                    body.detail = (res as any).detail;
                }
            } else if (exception instanceof DatabaseError){
                body.message = exception.message;
                body.detail = {
                    message: (exception as any).detail,
                    command: (exception as any).query.command,
                    params: (exception as any).query.params,
                }
            } else {
                body.message = (exception as any).message;
            }
        }
        
        super.catch(new HttpException(body, body.statusCode), host);
    }
}