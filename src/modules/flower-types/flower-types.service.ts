import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFlowerTypeDto } from './dto/create-flower-type.dto';
import { UpdateFlowerTypeDto } from './dto/update-flower-type.dto';
import { In, Repository } from 'typeorm';
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

  async findAll(domain: string) {
    const rawResults: { flowersLength: string }[] = await this.repository
      .createQueryBuilder('flower-type')
      .leftJoin('flower-type.flowers', 'flower')
      .leftJoin('flower.brand', 'brand')
      .select('flower-type.id', 'id')
      .addSelect('flower-type.title', 'title')
      .addSelect('COUNT(flower.id)', 'flowersLength')
      .where('brand.domain = :domain', { domain })
      .groupBy('flower-type.id')
      .addGroupBy('flower-type.title')
      .getRawMany();

    return rawResults.map((row) => ({
      ...row,
      flowersLength: Number(row.flowersLength),
    }));
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
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
