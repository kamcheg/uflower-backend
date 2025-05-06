import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from '../constants';
import { Request } from 'express';

export const UserDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserPayload => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.user as UserPayload;
  },
);
