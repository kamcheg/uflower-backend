import { Injectable, NotFoundException } from '@nestjs/common';
import { Between, In, Repository } from 'typeorm';
import { Flower } from '../entities/flower.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FlowersFilterDto } from '../dto/query-flower.dto';

const scheme = {
  relations: {
    size: true,
    reasons: true,
    recipients: true,
    flowerTypes: true,
  },
} as const;

@Injectable()
export class FlowersService {
  constructor(
    @InjectRepository(Flower)
    private readonly repository: Repository<Flower>,
  ) {}

  async findAll({ filters }: { filters: FlowersFilterDto }) {
    const {
      page,
      limit,
      sizes,
      composition,
      reasons,
      recipients,
      priceMin,
      priceMax,
    } = filters;

    const [data, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        size: {
          id: sizes?.length ? In(sizes) : undefined,
        },
        flowerTypes: {
          id: composition?.length ? In(composition) : undefined,
        },
        reasons: {
          id: reasons?.length ? In(reasons) : undefined,
        },
        recipients: {
          id: recipients?.length ? In(recipients) : undefined,
        },
        price: Between(priceMin || 0, priceMax || 100000000),
        isActive: true,
      },
      order: {
        inStock: 'desc',
        priority: 'desc',
        createdAt: 'desc',
      },
      select: {
        id: true,
        createdAt: true,
        name: true,
        description: true,
        inStock: true,
        isActive: true,
        images: true,
        mainImageIndex: true,
        price: true,
        priority: true,
      },
    });

    return {
      data,
      pagination: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  findByIds({ ids }: { ids: string[] }) {
    return this.repository.find({
      where: {
        id: In(ids),
        isActive: true,
      },
      ...scheme,
    });
  }

  async findOne({ id }: { id: number; brandId?: number; domain?: string }) {
    const current = await this.repository.findOne({
      where: {
        id,
      },
      ...scheme,
    });

    if (!current) {
      throw new NotFoundException(`Flower with id ${id} not found`);
    }

    return current;
  }
}
