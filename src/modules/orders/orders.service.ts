import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Flower } from '../flowers/entities/flower.entity';
import { OrderFlower } from '../order-flowers/entities/order-flower.entity';
import { TelegramService } from '../telegram/telegram.service';
// import { formatOrderMessage } from './orders.functions';
import { UsersService } from '../users/users.service';
import { CustomerOrderSummaryDto } from './dto/get-customer-summary.dto';
import { formatOrderMessage } from './orders.functions';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(Flower)
    private flowerRepository: Repository<Flower>,

    private readonly usersService: UsersService,

    private readonly telegramService: TelegramService,
  ) {}

  async create(dto: CreateOrderDto) {
    const flowers: Flower[] = [];

    const orderFlowers = await Promise.all(
      dto.orderFlowers.map(async (ofDto) => {
        const flower = await this.flowerRepository.findOneByOrFail({
          id: ofDto.flowerId,
        });

        flowers.push(flower);

        const orderFlower = new OrderFlower();
        orderFlower.flower = flower;
        orderFlower.price = flower.price;
        orderFlower.quantity = ofDto.quantity;

        return orderFlower;
      }),
    );

    const order = this.orderRepository.create({
      ...dto,
      orderFlowers,
    });

    const users = await this.usersService.findAll();

    await Promise.all(
      users
        .filter((i) => !!i.telegramChatId)
        .map((user) => {
          return this.telegramService.sendMessage(
            user.telegramChatId,
            formatOrderMessage(dto, flowers),
          );
        }),
    );

    return this.orderRepository.save(order);
  }

  findAll() {
    return this.orderRepository.find({
      withDeleted: true,
      order: {
        createdAt: 'desc',
      },
    });
  }

  async getCustomersSummary(): Promise<CustomerOrderSummaryDto[]> {
    interface IItem {
      customerPhone: string;
      orders: string;
      sum: string;
    }

    const result: IItem[] = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoin('order.orderFlowers', 'orderFlower')
      .select('order.customerPhone', 'customerPhone')
      .addSelect('COUNT(DISTINCT order.id)', 'orders')
      .addSelect('SUM(orderFlower.price * orderFlower.quantity)', 'sum')
      .groupBy('order.customerPhone')
      .getRawMany();

    return result.map((r: IItem) => ({
      customerPhone: r.customerPhone,
      orders: parseInt(r.orders, 10),
      sum: parseFloat(r.sum),
    }));
  }
}
