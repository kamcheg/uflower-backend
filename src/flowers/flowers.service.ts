import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFlowerDto } from './dto/create-flower.dto';
// import { UpdateFlowerDto } from './dto/update-flower.dto';
import { In, Repository } from 'typeorm';
import { Flower } from './entities/flower.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SizesService } from '../sizes/sizes.service';
import { ReasonsService } from '../reasons/reasons.service';
import { RecipientsService } from '../recipients/recipients.service';

const scheme = {
  relations: {
    size: true,
    reasons: true,
    recipients: true,
    flowerTypes: true,
  },
  // select: {
  //   size: {
  //     id: true,
  //     title: true,
  //   },
  // },
} as const;

@Injectable()
export class FlowersService {
  constructor(
    @InjectRepository(Flower)
    private repository: Repository<Flower>,
    private readonly sizesService: SizesService,
    private readonly reasonsService: ReasonsService,
    private readonly recipientsService: RecipientsService,
  ) {}

  async create(createFlowerDto: CreateFlowerDto) {
    const size = await this.sizesService.findOne(createFlowerDto.sizeId);
    const reasons = await this.reasonsService.findByIds(
      createFlowerDto.reasonIds,
    );
    const recipients = await this.recipientsService.findByIds(
      createFlowerDto.recipientIds,
    );

    const newEl = this.repository.create({
      ...createFlowerDto,
      size,
      reasons,
      recipients,
    });
    return this.repository.save(newEl);
  }

  findAll() {
    return this.repository.find(scheme);
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
