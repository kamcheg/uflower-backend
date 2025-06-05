import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

dotenv.config();
const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES;

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret,
      signOptions: { expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
