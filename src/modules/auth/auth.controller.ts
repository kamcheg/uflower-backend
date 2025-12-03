import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from './guards/auth.guard';
import { UserDecorator } from './decorators/user.decorator';
import { UserPayload } from '../../common/types';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.phone, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @UseGuards(AuthGuard)
  @Post('change-password')
  async changePassword(
    @UserDecorator() user: UserPayload,
    @Body() dto: ChangePasswordDto,
  ) {
    await this.authService.changePassword(user, dto);
    return 'ok';
  }
}
