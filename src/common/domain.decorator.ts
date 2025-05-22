import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Domain = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request>();

    const clientHost = String(request.headers['w-client-host']);

    return clientHost || 'none';
  },
);
