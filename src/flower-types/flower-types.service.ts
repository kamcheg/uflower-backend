import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFlowerTypeDto } from './dto/create-flower-type.dto';
import { UpdateFlowerTypeDto } from './dto/update-flower-type.dto';
import { Repository } from 'typeorm';
import { FlowerType } from './entities/flower-type.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FlowerTypesService {
  constructor(
    @InjectRepository(FlowerType)
    private repository: Repository<FlowerType>,
  ) {}

  create(createFlowerTypeDto: CreateFlowerTypeDto) {
    return this.repository.save(createFlowerTypeDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, updateFlowerTypeDto: UpdateFlowerTypeDto) {
    const current = await this.repository.preload({
      id,
      ...updateFlowerTypeDto,
    });

    if (!current) {
      throw new NotFoundException(`FlowerType with id ${id} not found`);
    }

    return this.repository.save(current);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
