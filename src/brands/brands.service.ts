import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPayload } from '../common/types';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private repository: Repository<Brand>,
  ) {}

  create(createBrandDto: CreateBrandDto) {
    return this.repository.save(createBrandDto);
  }

  async findOne(user: UserPayload) {
    const current = await this.repository.findOne({
      relations: {
        shops: true,
      },
      where: {
        id: user.brand,
      },
    });

    if (!current) {
      throw new NotFoundException(`Brand with id ${user.brand} not found`);
    }

    return current;
  }
}
