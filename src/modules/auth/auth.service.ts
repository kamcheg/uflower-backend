import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersService.findOne({ email: username });

    const authenticated = await compare(pass, user.password);
    if (!authenticated) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email, brand: user.brand.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(dto: CreateUserDto) {
    await this.usersService.create(dto);
  }
}
