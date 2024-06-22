import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AppSession } from './session.model';

export const Session = createParamDecorator(
    (data: 'data' | 'token' | null | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<Request&{ appSession: AppSession }>();
        if (data == 'data') return request.appSession.data;
        if (data == 'token') return request.appSession.token;
        return request.appSession;
    },
);