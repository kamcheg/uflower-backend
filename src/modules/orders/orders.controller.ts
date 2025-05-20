import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateShopDto } from '../shops/dto/create-shop.dto';
import { UserDecorator } from '../auth/decorators/user.decorator';
import { UserPayload } from '../../common/types';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @Headers('brand-slug') brandSlug: string,
  ) {
    return this.ordersService.create({
      dto: createOrderDto,
      brandSlug,
    });
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.ordersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('customers-summary')
  getCustomersSummary(@UserDecorator() user: UserPayload) {
    return this.ordersService.getCustomersSummary(user);
  }
}
