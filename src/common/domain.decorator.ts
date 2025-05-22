import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

// TODO
export const Domain = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const origin = request.headers.origin;
    const referer = request.headers.referer;
    const host = request.headers.host;

    try {
      if (typeof origin === 'string') {
        return new URL(origin).hostname;
      } else if (typeof referer === 'string') {
        return new URL(referer).hostname;
      } else if (typeof host === 'string') {
        return host.split(':')[0]; // убрать порт
      } else {
        return 'magas-flowers.ru'; // TODO
      }
    } catch {
      return 'magas-flowers.ru'; // TODO
    }
  },
);
