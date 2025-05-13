import { IsNumber, IsPositive } from 'class-validator';

export class CreateOrderFlowerDto {
  @IsNumber()
  flowerId: number;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
