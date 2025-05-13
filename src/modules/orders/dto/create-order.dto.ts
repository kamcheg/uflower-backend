import {
  ArrayMinSize,
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderFlowerDto } from '../../order-flowers/create-order-flower.dto';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsString()
  customerPhone: string;

  @IsString()
  address: string;

  @IsBoolean()
  isDeliverToCustomer: boolean;

  @IsString()
  recipientName: string;

  @IsString()
  recipientPhone: string;

  @IsString()
  comment: string;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderFlowerDto)
  @ArrayMinSize(1)
  orderFlowers: CreateOrderFlowerDto[];
}
