import { Injectable } from '@nestjs/common';
import { CreateFlowerDto } from '../dto/create-flower.dto';
import { Repository } from 'typeorm';
import { Flower } from '../entities/flower.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SizesService } from '../../sizes/sizes.service';
import { ReasonsService } from '../../reasons/reasons.service';
import { RecipientsService } from '../../recipients/recipients.service';
import { FlowerTypesService } from '../../flower-types/flower-types.service';
import { UserPayload } from '../../../common/types';
import { BrandsService } from '../../brands/services/brands.service';
import { UpdateFlowerDto } from '../dto/update-flower.dto';
import { FlowersService } from './flowers.service';

const scheme = {
  relations: {
    size: true,
    reasons: true,
    recipients: true,
    flowerTypes: true,
  },
} as const;

@Injectable()
export class AdminFlowersService {
  constructor(
    @InjectRepository(Flower)
    private readonly repository: Repository<Flower>,
    private readonly flowersService: FlowersService,
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
      mainImageIndex: createFlowerDto.mainImageIndex || 0,
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

  async update({
    id,
    brandId,
    updateFlowerDto,
  }: {
    id: number;
    updateFlowerDto: UpdateFlowerDto;
    brandId: UserPayload['brand'];
  }) {
    const current = await this.flowersService.findOne({ id, brandId });

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
