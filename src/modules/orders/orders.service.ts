import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Flower } from '../flowers/entities/flower.entity';
import { OrderFlower } from '../order-flowers/entities/order-flower.entity';
import { TelegramService } from '../telegram/telegram.service';
import { formatOrderMessage } from './orders.functions';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(Flower)
    private flowerRepository: Repository<Flower>,

    private readonly telegramService: TelegramService,
  ) {}

  async create(dto: CreateOrderDto) {
    const flowers: Flower[] = [];

    const orderFlowers = await Promise.all(
      dto.orderFlowers.map(async (ofDto) => {
        const flower = await this.flowerRepository.findOneByOrFail({
          id: ofDto.flowerId,
          // TODO add brand
        });

        flowers.push(flower);

        const orderFlower = new OrderFlower();
        orderFlower.flower = flower;
        orderFlower.price = flower.price;
        orderFlower.quantity = ofDto.quantity;

        return orderFlower;
      }),
    );

    await this.telegramService.sendMessage(
      871034189, // TODO!!!
      formatOrderMessage(dto, flowers),
    );

    const order = this.orderRepository.create({
      ...dto,
      orderFlowers,
    });

    return this.orderRepository.save(order);
  }

  findAll() {
    return this.orderRepository.find({
      order: {
        createdAt: 'desc',
      },
    });
  }
}
