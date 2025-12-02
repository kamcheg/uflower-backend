import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
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
}
