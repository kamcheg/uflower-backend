import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Flower } from '../flowers/entities/flower.entity';
import { OrderFlower } from '../order-flowers/entities/order-flower.entity';
import { TelegramService } from '../telegram/telegram.service';
import { formatOrderMessage } from './orders.functions';
import { BrandsService } from '../brands/brands.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(Flower)
    private flowerRepository: Repository<Flower>,

    private readonly usersService: UsersService,

    private readonly telegramService: TelegramService,

    private readonly brandsService: BrandsService,
  ) {}

  async create({ dto, brandSlug }: { dto: CreateOrderDto; brandSlug: string }) {
    const flowers: Flower[] = [];

    const orderFlowers = await Promise.all(
      dto.orderFlowers.map(async (ofDto) => {
        const flower = await this.flowerRepository.findOneByOrFail({
          id: ofDto.flowerId,
          brand: {
            slug: brandSlug,
          },
        });

        flowers.push(flower);

        const orderFlower = new OrderFlower();
        orderFlower.flower = flower;
        orderFlower.price = flower.price;
        orderFlower.quantity = ofDto.quantity;

        return orderFlower;
      }),
    );

    const brand = await this.brandsService.findOneBySlug(brandSlug);

    const order = this.orderRepository.create({
      ...dto,
      brand: brand,
      orderFlowers,
    });

    const users = await this.usersService.findUsersByBrand({ id: brand.id });

    await Promise.all(
      users
        .filter((i) => !!i.telegramChatId)
        .map((user) => {
          return this.telegramService.sendMessage(
            user.telegramChatId!,
            formatOrderMessage(dto, flowers),
          );
        }),
    );

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
