import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Size } from './entities/size.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SizesService {
  constructor(
    @InjectRepository(Size)
    private sizesRepository: Repository<Size>,
  ) {}

  async create(createSizeDto: CreateSizeDto) {
    const newSize = this.sizesRepository.create(createSizeDto);
    return await this.sizesRepository.save(newSize);
  }

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

  async update(id: number, updateSizeDto: UpdateSizeDto) {
    const size = await this.sizesRepository.preload({
      id,
      ...updateSizeDto,
    });

    if (!size) {
      throw new NotFoundException(`Size with id ${id} not found`);
    }

    return await this.sizesRepository.save(size);
  }

  async remove(id: number) {
    await this.sizesRepository.delete(id);
  }
}
