import { Injectable } from '@nestjs/common';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private repository: Repository<Image>,
  ) {}

  async create(file: Express.Multer.File): Promise<Image> {
    const image = this.repository.create({
      filename: file.originalname,
      path: file.path,
      mimetype: file.mimetype,
    });

    return this.repository.save(image);
  }
}
