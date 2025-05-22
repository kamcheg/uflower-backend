import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UserDecorator } from '../auth/decorators/user.decorator';
import { UserPayload } from '../../common/types';
import { Domain } from '../../common/domain.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Domain() domain: string) {
    return this.ordersService.create({
      dto: createOrderDto,
      domain,
    });
  }

  @UseGuards(AuthGuard)
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(@UserDecorator() user: UserPayload) {
    return this.ordersService.findAll(user);
  }

  @UseGuards(AuthGuard)
  @Get('customers-summary')
  getCustomersSummary(@UserDecorator() user: UserPayload) {
    return this.ordersService.getCustomersSummary(user);
  }
}
