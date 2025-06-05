import { Injectable } from '@nestjs/common';
import { Between, In, Repository } from 'typeorm';
import { Flower } from '../entities/flower.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FlowersFilterDto } from '../dto/query-flower.dto';

@Injectable()
export class ClientFlowersService {
  constructor(
    @InjectRepository(Flower)
    private readonly repository: Repository<Flower>,
  ) {}

  async findAll({
    domain,
    filters,
  }: {
    domain: string;
    filters: FlowersFilterDto;
  }) {
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
        brand: {
          domain: domain,
        },
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
}
