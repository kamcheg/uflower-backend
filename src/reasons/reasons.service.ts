import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReasonDto } from './dto/create-reason.dto';
import { UpdateReasonDto } from './dto/update-reason.dto';
import { Repository } from 'typeorm';
import { Reason } from './entities/reason.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReasonsService {
  constructor(
    @InjectRepository(Reason)
    private repository: Repository<Reason>,
  ) {}

  create(createReasonDto: CreateReasonDto) {
    return this.repository.save(createReasonDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, updateReasonDto: UpdateReasonDto) {
    const current = await this.repository.preload({
      id,
      ...updateReasonDto,
    });

    if (!current) {
      throw new NotFoundException(`Reason with id ${id} not found`);
    }

    return this.repository.save(current);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
