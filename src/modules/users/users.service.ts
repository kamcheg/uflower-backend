import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPayload } from '../../common/types';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';
import { BrandsService } from '../brands/brands.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,

    private readonly brandsService: BrandsService,
  ) {}

  async findOne({ email, id }: { email?: string; id?: number }) {
    if (!email && !id) {
      throw new NotFoundException(`User not found`);
    }

    const user = await this.repository.findOneOrFail({
      where: [{ email }, { id }],
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

  async create(dto: CreateUserDto) {
    const password = await hash(dto.password, 4);

    const brand = await this.brandsService.findOne(dto.brandId);

    const newUser = {
      email: dto.email,
      password,
      brand: brand,
    };

    this.repository.create(newUser);
    return this.repository.save(newUser);
  }

  async generateToken(userPayload: UserPayload) {
    const user = await this.findOne({ email: userPayload.email });
    const token = uuidv4();
    user.telegramToken = token;
    await this.repository.save(user);

    return token;
  }
}
