import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async findOne(email: string) {
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
}
