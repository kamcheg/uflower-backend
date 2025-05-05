import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private repository: Repository<Brand>,
  ) {}

  create(createBrandDto: CreateBrandDto) {
    return this.repository.save(createBrandDto);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const current = await this.repository.findOneBy({ id });

    if (!current) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }

    return current;
  }
}
