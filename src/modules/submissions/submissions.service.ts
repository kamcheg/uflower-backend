import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Submission } from './entities/submission.entity';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Submission)
    private repository: Repository<Submission>,
  ) {}

  create(dto: CreateSubmissionDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const current = await this.repository.findOneBy({ id });

    if (!current) {
      throw new NotFoundException(`Заявка с id === ${id} не найдена!`);
    }

    return current;
  }
}
