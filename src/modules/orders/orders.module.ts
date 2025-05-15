import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { FlowersModule } from '../flowers/flowers.module';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), FlowersModule, TelegramModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
