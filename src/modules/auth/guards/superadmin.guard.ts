import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const headerKey = request.headers['super-admin-key'];

    if (!headerKey || headerKey !== process.env.SUPER_ADMIN_KEY) {
      throw new UnauthorizedException('Invalid or missing Super Admin Key');
    }

    return true;
  }
}
