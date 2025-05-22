import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { Between, In, Repository } from 'typeorm';
import { Flower } from './entities/flower.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SizesService } from '../sizes/sizes.service';
import { ReasonsService } from '../reasons/reasons.service';
import { RecipientsService } from '../recipients/recipients.service';
import { FlowerTypesService } from '../flower-types/flower-types.service';
import { UserPayload } from '../../common/types';
import { BrandsService } from '../brands/brands.service';
import { UpdateFlowerDto } from './dto/update-flower.dto';
import { FlowersFilterDto } from './dto/query-flower.dto';

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
    private readonly sizesService: SizesService,
    private readonly reasonsService: ReasonsService,
    private readonly recipientsService: RecipientsService,
    private readonly flowerTypesService: FlowerTypesService,
    private readonly brandsService: BrandsService,
  ) {}

  async create(
    createFlowerDto: CreateFlowerDto,
    brandId: UserPayload['brand'],
  ) {
    const size = await this.sizesService.findOne(createFlowerDto.sizeId);
    const reasons = await this.reasonsService.findByIds(
      createFlowerDto.reasonIds,
    );
    const recipients = await this.recipientsService.findByIds(
      createFlowerDto.recipientIds,
    );
    const flowerTypes = await this.flowerTypesService.findByIds(
      createFlowerDto.flowerTypeIds,
    );
    const brand = await this.brandsService.findOne(brandId);
    const ingredients = createFlowerDto.ingredients || [];

    const newEl = this.repository.create({
      ...createFlowerDto,
      brand,
      size,
      reasons,
      recipients,
      flowerTypes,
      ingredients,
    });
    return this.repository.save(newEl);
  }

  findAll(brandId: number) {
    return this.repository.find({
      where: {
        brand: {
          id: brandId,
        },
      },
      ...scheme,
      order: {
        createdAt: 'desc',
      },
    });
  }

  async findForClient({
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
      ...scheme,
      order: {
        inStock: 'desc', // TODO на подумать
        priority: 'desc', // TODO на подумать
        createdAt: 'desc',
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

  async update({
    id,
    brandId,
    updateFlowerDto,
  }: {
    id: number;
    updateFlowerDto: UpdateFlowerDto;
    brandId: UserPayload['brand'];
  }) {
    const current = await this.findOne({ id, brandId });

    Object.assign(current, updateFlowerDto);

    if (updateFlowerDto.sizeId) {
      current.size = await this.sizesService.findOne(updateFlowerDto.sizeId);
    }
    if (updateFlowerDto.reasonIds) {
      current.reasons = await this.reasonsService.findByIds(
        updateFlowerDto.reasonIds,
      );
    }
    if (updateFlowerDto.recipientIds) {
      current.recipients = await this.recipientsService.findByIds(
        updateFlowerDto.recipientIds,
      );
    }
    if (updateFlowerDto.flowerTypeIds) {
      current.flowerTypes = await this.flowerTypesService.findByIds(
        updateFlowerDto.flowerTypeIds,
      );
    }

    return this.repository.save(current);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
