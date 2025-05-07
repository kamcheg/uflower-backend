import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateShopDto } from './dto/create-shop.dto';
import { BrandsService } from '../brands/brands.service';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private readonly repository: Repository<Shop>,
    private readonly brandsService: BrandsService,
  ) {}

  // COMPLETED
  async create(createDto: CreateShopDto, brandId: number) {
    const brand = await this.brandsService.findOne(brandId);

    const newEl = this.repository.create({
      ...createDto,
      brand,
    });
    return await this.repository.save(newEl);
  }

  async update(id: number, updateDto: UpdateShopDto) {
    const current = await this.repository.preload({
      id,
      ...updateDto,
    });

    if (!current) {
      throw new NotFoundException(`Shop with id ${id} not found`);
    }

    return await this.repository.save(current);
  }

  // COMPLETED
  async remove(id: number, brandId: number) {
    const result = await this.repository.delete({
      id: id,
      brand: {
        id: brandId,
      },
    });

    if (result.affected === 0) {
      throw new NotFoundException(
        `Запись с id=${id} и brandId=${brandId} не найдена`,
      );
    }
  }
}
