import { BadRequestException, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { FlowerType } from './entities/flower-type.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FlowerTypesService {
  constructor(
    @InjectRepository(FlowerType)
    private repository: Repository<FlowerType>,
  ) {}

  async findAll() {
    return await this.repository.find();
  }

  async findByIds(ids: number[]) {
    const items = await this.repository.findBy({
      id: In(ids),
    });

    if (items.length !== ids.length) {
      throw new BadRequestException(`Some flower-types not found`);
    }

    return items;
  }
}
