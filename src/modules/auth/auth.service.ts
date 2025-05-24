import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { compare, hash } from 'bcrypt';
import { UserPayload } from '../../common/types';
import { ChangePasswordDto } from './dto/change-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(phone: string, pass: string) {
    let user: User;

    try {
      user = await this.usersService.findOne({ phone: phone });
    } catch {
      throw new UnauthorizedException(
        'Пользователь с таким номером не зарегистрирован!',
      );
    }

    const authenticated = await compare(pass, user.password);
    if (!authenticated) {
      throw new UnauthorizedException('Пароли не совпадают.');
    }

    const payload = { sub: user.id, phone: user.phone, brand: user.brand.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(dto: CreateUserDto) {
    await this.usersService.create(dto);
  }

  async changePassword(userPayload: UserPayload, dto: ChangePasswordDto) {
    const { oldPassword, newPassword } = dto;

    const user = await this.usersService.findOne({ id: userPayload.sub });

    const authenticated = await compare(oldPassword, user.password);
    if (!authenticated) {
      throw new UnauthorizedException('Пароли не совпадают!');
    }

    user.password = await hash(newPassword, 4);

    await this.userRepository.save(user);
  }
}
