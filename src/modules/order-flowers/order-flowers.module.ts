import { Module } from '@nestjs/common';
import { OrderFlowersService } from './order-flowers.service';
import { OrderFlowersController } from './order-flowers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderFlower } from './entities/order-flower.entity';
import { OrdersModule } from '../orders/orders.module';
import { FlowersModule } from '../flowers/flowers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderFlower]),
    OrdersModule,
    FlowersModule,
  ],
  controllers: [OrderFlowersController],
  providers: [OrderFlowersService],
})
export class OrderFlowersModule {}
