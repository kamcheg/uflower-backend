import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipient } from './entities/recipient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecipientsService {
  constructor(
    @InjectRepository(Recipient)
    private repository: Repository<Recipient>,
  ) {}

  async findAll() {
    return this.repository.find();
  }
}
