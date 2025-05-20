import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPayload } from '../../common/types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async findOne({ email }: { email?: string; id?: number }) {
    const user = await this.repository.findOne({
      where: { email },
      relations: {
        brand: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with email ${email}`);
    }

    return user;
  }

  findUsersByBrand({ id, slug }: { id?: number; slug?: string }) {
    return this.repository.find({
      where: {
        brand: [{ id }, { slug }],
      },
    });
  }

  async generateToken(userPayload: UserPayload) {
    const user = await this.findOne({ email: userPayload.email });
    const token = uuidv4();
    user.telegramToken = token;
    await this.repository.save(user);

    return token;
  }
}
