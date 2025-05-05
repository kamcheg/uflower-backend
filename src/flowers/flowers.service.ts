import { Injectable } from '@nestjs/common';
import { CreateFlowerDto } from './dto/create-flower.dto';
// import { UpdateFlowerDto } from './dto/update-flower.dto';
import { Repository } from 'typeorm';
import { Flower } from './entities/flower.entity';
import { InjectRepository } from '@nestjs/typeorm';

const scheme = {
  relations: { size: true },
  select: {
    size: {
      id: true,
      title: true,
    },
  },
} as const;

@Injectable()
export class FlowersService {
  constructor(
    @InjectRepository(Flower)
    private repository: Repository<Flower>,
  ) {}

  create(createFlowerDto: CreateFlowerDto) {
    const { size: sizeId } = createFlowerDto;
    return sizeId;
  }

  findAll() {
    return this.repository.find(scheme);
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
      ...scheme,
    });
  }

  // update(id: number, updateFlowerDto: UpdateFlowerDto) {
  //   return `This action updates a #${id} flower`;
  // }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
