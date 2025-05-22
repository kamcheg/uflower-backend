import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Domain = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const host = request.headers.host;

    if (host) {
      return 'magas-flowers.ru';
    }

    return 'none';
  },
);
