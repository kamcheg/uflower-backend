import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from '../constants';
import { Request } from 'express';
// export const User = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     return request.user;
//   },
// );
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserPayload => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.user as UserPayload;
  },
);
