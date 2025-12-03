import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Reason } from './entities/reason.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReasonsService {
  constructor(
    @InjectRepository(Reason)
    private repository: Repository<Reason>,
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const current = await this.repository.findOneBy({ id });

    if (!current) {
      throw new NotFoundException(`Reason with id ${id} not found`);
    }

    return current;
  }

  async findByIds(ids: number[]) {
    const reasons = await this.repository.findBy({
      id: In(ids),
    });

    if (reasons.length !== ids.length) {
      throw new BadRequestException(`Some reasons not found`);
    }

    return reasons;
  }
}
