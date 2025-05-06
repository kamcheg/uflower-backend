import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { Repository } from 'typeorm';
import { Flower } from './entities/flower.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SizesService } from '../sizes/sizes.service';
import { ReasonsService } from '../reasons/reasons.service';
import { RecipientsService } from '../recipients/recipients.service';
import { FlowerTypesService } from '../flower-types/flower-types.service';
import { ImagesService } from '../images/images.service';

const scheme = {
  relations: {
    size: true,
    reasons: true,
    recipients: true,
    flowerTypes: true,
    images: true,
  },
  select: {
    images: {
      id: true,
      path: true,
    },
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
    private readonly imagesService: ImagesService,
  ) {}

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
    const images = await this.imagesService.findByIds(createFlowerDto.imageIds);

    const newEl = this.repository.create({
      ...createFlowerDto,
      size,
      reasons,
      recipients,
      flowerTypes,
      images,
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
    });
  }

  async findOne(id: number) {
    const current = await this.repository.findOne({
      where: { id },
      ...scheme,
    });

    if (!current) {
      throw new NotFoundException(`Flower with id ${id} not found`);
    }

    return current;
  }

  // update(id: number, updateFlowerDto: UpdateFlowerDto) {
  //   return `This action updates a #${id} flower`;
  // }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
