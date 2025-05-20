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
import { CustomerOrderSummaryDto } from './dto/get-customer-summary.dto';
import { UserPayload } from '../../common/types';

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

  findAll(user: UserPayload) {
    return this.orderRepository.find({
      where: {
        brand: { id: user.brand },
      },
      order: {
        createdAt: 'desc',
      },
    });
  }

  async getCustomersSummary(
    user: UserPayload,
  ): Promise<CustomerOrderSummaryDto[]> {
    interface IItem {
      customerPhone: string;
      orders: string;
      sum: string;
    }

    // TODO изучить
    const result: IItem[] = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoin('order.orderFlowers', 'orderFlower')
      .leftJoin('order.brand', 'brand') // добавляем join на brand
      .select('order.customerPhone', 'customerPhone')
      .addSelect('COUNT(DISTINCT order.id)', 'orders')
      .addSelect('SUM(orderFlower.price * orderFlower.quantity)', 'sum')
      .where('brand.id = :brandId', { brandId: user.brand }) // фильтр по brand.id
      .groupBy('order.customerPhone')
      .getRawMany();

    return result.map((r: IItem) => ({
      customerPhone: r.customerPhone,
      orders: parseInt(r.orders, 10),
      sum: parseFloat(r.sum),
    }));
  }
}
