import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Flower } from '../entities/flower.entity';
import { InjectRepository } from '@nestjs/typeorm';

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

  findByIds({ domain, ids }: { domain: string; ids: string[] }) {
    return this.repository.find({
      where: {
        id: In(ids),
        brand: {
          domain: domain,
        },
        isActive: true,
      },
      ...scheme,
    });
  }

  async findOne({
    id,
    brandId,
    domain,
  }: {
    id: number;
    brandId?: number;
    domain?: string;
  }) {
    if (!brandId && !domain) {
      throw new NotFoundException(
        'You did not pass any of the parameters (brandId, domain)',
      );
    }

    const current = await this.repository.findOne({
      where: {
        id,
        brand: [{ id: brandId }, { domain: domain }],
      },
      ...scheme,
    });

    if (!current) {
      throw new NotFoundException(`Flower with id ${id} not found`);
    }

    return current;
  }
}
