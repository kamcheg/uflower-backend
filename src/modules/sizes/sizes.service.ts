import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Size } from './entities/size.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SizesService {
  constructor(
    @InjectRepository(Size)
    private sizesRepository: Repository<Size>,
  ) {}

  findAll() {
    return this.sizesRepository.find();
  }

  async findOne(id: number) {
    const current = await this.sizesRepository.findOneBy({ id });

    if (!current) {
      throw new NotFoundException(`Size with id ${id} not found`);
    }

    return current;
  }
}
