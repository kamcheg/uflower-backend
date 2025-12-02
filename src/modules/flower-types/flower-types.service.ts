import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
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
}
