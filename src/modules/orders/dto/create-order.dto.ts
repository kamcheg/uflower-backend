import {
  ArrayMinSize,
  IsBoolean,
  IsNotEmpty,
  IsString,
  Matches,
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
  @Matches(/^7\d{10}$/, { message: 'Invalid phone number format' })
  customerPhone: string;

  @IsString()
  address: string;

  @IsBoolean()
  isDeliverToCustomer: boolean;

  @IsString()
  recipientName: string;

  @IsString()
  @Matches(/^7\d{10}$/, { message: 'Invalid phone number format' })
  recipientPhone: string;

  @IsString()
  comment: string;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderFlowerDto)
  @ArrayMinSize(1)
  orderFlowers: CreateOrderFlowerDto[];
}
