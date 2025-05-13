import { IsNumber, IsPositive } from 'class-validator';

export class CreateOrderFlowerDto {
  @IsNumber()
  flowerId: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
