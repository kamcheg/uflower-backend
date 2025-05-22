import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Domain = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const host = request.headers.host;

    // if (request) {
    //   return 'magas-flowers.ru';
    // }

    if (typeof host === 'string') {
      return host.split(':')[0]; // убираем порт, если есть
    }

    return 'none';
  },
);
