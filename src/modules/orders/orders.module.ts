import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { FlowersModule } from '../flowers/flowers.module';
import { TelegramModule } from '../telegram/telegram.module';
import { BrandsModule } from '../brands/brands.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    UsersModule,
    BrandsModule,
    FlowersModule,
    TelegramModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
