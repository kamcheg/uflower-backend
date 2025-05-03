import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { UpdateRecipientDto } from './dto/update-recipient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipient } from './entities/recipient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecipientsService {
  constructor(
    @InjectRepository(Recipient)
    private recipientRepository: Repository<Recipient>,
  ) {}

  async create(createRecipientDto: CreateRecipientDto) {
    const newRecipient = this.recipientRepository.create(createRecipientDto);
    return await this.recipientRepository.save(newRecipient);
  }

  findAll() {
    return this.recipientRepository.find();
  }

  findOne(id: number) {
    return this.recipientRepository.findOneBy({ id });
  }

  async update(id: number, updateRecipientDto: UpdateRecipientDto) {
    const recipient = await this.recipientRepository.preload({
      id,
      ...updateRecipientDto,
    });

    if (!recipient) {
      throw new NotFoundException(`Recipient with id ${id} not found`);
    }

    return this.recipientRepository.save(recipient);
  }

  remove(id: number) {
    return this.recipientRepository.delete(id);
  }
}
