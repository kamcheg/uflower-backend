import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateShopDto } from './dto/create-shop.dto';
import { BrandsService } from '../brands/brands.service';
import { UserPayload } from '../common/types';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private readonly repository: Repository<Shop>,
    private readonly brandsService: BrandsService,
  ) {}

  async create(createDto: CreateShopDto, brandId: number) {
    const brand = await this.brandsService.findOne(brandId);

    const newEl = this.repository.create({
      ...createDto,
      brand,
    });
    return await this.repository.save(newEl);
  }

  async findAll(brandId: UserPayload['brand']) {
    return await this.repository.find({
      where: {
        brand: {
          id: brandId,
        },
      },
    });
  }

  async update(
    id: number,
    brandId: UserPayload['brand'], // TODO!!!!
    updateDto: UpdateShopDto,
  ) {
    const shop = await this.repository.findOneBy({
      id: id,
      brand: {
        id: brandId,
      },
    });

    if (!shop) {
      throw new NotFoundException(
        `Shop with id ${id} and brandId ${brandId} not found`,
      );
    }

    Object.assign(shop, updateDto);

    return await this.repository.save(shop);
  }

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
