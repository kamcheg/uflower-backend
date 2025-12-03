import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPayload } from '../../common/types';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async findOne({ phone, id }: { phone?: string; id?: number }): Promise<User> {
    if (!phone && !id) {
      throw new NotFoundException(`User not found`);
    }

    const user = await this.repository.findOne({
      where: [{ phone }, { id }],
    });

    if (!user) {
      throw new NotFoundException(`User with phone ${phone}`);
    }

    return user;
  }

  async create(dto: CreateUserDto) {
    const password = await hash(dto.password, 4);

    const newUser = {
      phone: dto.phone,
      password,
    };

    this.repository.create(newUser);
    return this.repository.save(newUser);
  }

  async generateToken(userPayload: UserPayload) {
    const user = await this.findOne({ phone: userPayload.phone });
    const token = uuidv4();
    user.telegramToken = token;
    await this.repository.save(user);

    return token;
  }
}
