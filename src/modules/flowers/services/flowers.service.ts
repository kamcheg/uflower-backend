import { Injectable, NotFoundException } from '@nestjs/common';
import { Between, In, Repository } from 'typeorm';
import { Flower } from '../entities/flower.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FlowersFilterDto } from '../dto/query-flower.dto';
import { UpdateFlowerDto } from '../dto/update-flower.dto';
import { SizesService } from '../../sizes/sizes.service';
import { ReasonsService } from '../../reasons/reasons.service';
import { RecipientsService } from '../../recipients/recipients.service';
import { FlowerTypesService } from '../../flower-types/flower-types.service';
import { CreateFlowerDto } from '../dto/create-flower.dto';

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

  findAllForAdmin() {
    return this.repository.find({
      ...scheme,
      order: {
        createdAt: 'desc',
      },
    });
  }

  async create(createFlowerDto: CreateFlowerDto) {
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
    const ingredients = createFlowerDto.ingredients || [];

    const newEl = this.repository.create({
      ...createFlowerDto,
      size,
      reasons,
      recipients,
      flowerTypes,
      ingredients,
      mainImageIndex: createFlowerDto.mainImageIndex || 0,
    });
    return this.repository.save(newEl);
  }

  async update({
    id,
    updateFlowerDto,
  }: {
    id: number;
    updateFlowerDto: UpdateFlowerDto;
  }) {
    const current = await this.findOne({ id });

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
    return this.repository.softDelete(id);
  }
}
