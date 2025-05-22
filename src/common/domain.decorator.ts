import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Domain = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const origin = request.headers.origin;
    const referer = request.headers.referer;

    try {
      if (typeof origin === 'string') {
        return new URL(origin).hostname;
      } else if (typeof referer === 'string') {
        return new URL(referer).hostname;
      } else {
        return 'неизвестен';
      }
    } catch {
      return 'неизвестен';
    }
  },
);
