import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipient } from './entities/recipient.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class RecipientsService {
  constructor(
    @InjectRepository(Recipient)
    private repository: Repository<Recipient>,
  ) {}

  async findAll() {
    return this.repository.find();
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
}
