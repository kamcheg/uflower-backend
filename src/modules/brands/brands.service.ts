import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPayload } from '../../common/types';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { UpdateLogoDto } from './dto/update-logo.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private repository: Repository<Brand>,
  ) {}

  create(createBrandDto: CreateBrandDto) {
    return this.repository.save(createBrandDto);
  }

  async changeLogo(brandId: UserPayload['brand'], dto: UpdateLogoDto) {
    const current = await this.repository.findOne({ where: { id: brandId } });

    if (!current) {
      throw new NotFoundException(`Brand with id ${brandId} not found`);
    }

    current.logo = dto.logo || null;
    return this.repository.save(current);
  }

  async findOne(brandId: UserPayload['brand']) {
    const current = await this.repository.findOne({
      where: {
        id: brandId,
      },
    });

    if (!current) {
      throw new NotFoundException(`Brand with id ${brandId} not found`);
    }

    return current;
  }

  async findOneByDomain(domain: string) {
    const current = await this.repository.findOne({
      where: {
        domain,
      },
    });

    if (!current) {
      throw new NotFoundException(`Brand with domain ${domain} not found`);
    }

    return current;
  }

  async update(brandId: number, dto: UpdateBrandDto) {
    const current = await this.repository.preload({
      id: brandId,
      ...dto,
    });

    if (!current) {
      throw new NotFoundException(`Brand with id ${brandId} not found`);
    }

    return this.repository.save(current);
  }
}
