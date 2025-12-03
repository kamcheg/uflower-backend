import { Controller } from '@nestjs/common';
import { OrderFlowersService } from './order-flowers.service';

@Controller('order-flowers')
export class OrderFlowersController {
  constructor(private readonly orderFlowersService: OrderFlowersService) {}
}
