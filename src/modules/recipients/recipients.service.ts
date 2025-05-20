import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { UpdateRecipientDto } from './dto/update-recipient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipient } from './entities/recipient.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class RecipientsService {
  constructor(
    @InjectRepository(Recipient)
    private repository: Repository<Recipient>,
  ) {}

  async create(createRecipientDto: CreateRecipientDto) {
    const newRecipient = this.repository.create(createRecipientDto);
    return await this.repository.save(newRecipient);
  }

  async findAll() {
    const rawResults: { flowersLength: string }[] = await this.repository
      .createQueryBuilder('recipient')
      .leftJoin('recipient.flowers', 'flower')
      .select('recipient.id', 'id')
      .addSelect('recipient.title', 'title')
      .addSelect('COUNT(flower.id)', 'flowersLength')
      .groupBy('recipient.id')
      .addGroupBy('recipient.title')
      .getRawMany();

    return rawResults.map((row) => ({
      ...row,
      flowersLength: Number(row.flowersLength),
    }));
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async findByIds(ids: number[]) {
    const items = await this.repository.findBy({
      id: In(ids),
    });

    if (items.length !== ids.length) {
      throw new BadRequestException(`Some recipients not found`);
    }

    return items;
  }

  async update(id: number, updateRecipientDto: UpdateRecipientDto) {
    const recipient = await this.repository.preload({
      id,
      ...updateRecipientDto,
    });

    if (!recipient) {
      throw new NotFoundException(`Recipient with id ${id} not found`);
    }

    return this.repository.save(recipient);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
