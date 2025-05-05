import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFlowerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  sizeId: number;

  // @IsNotEmpty()
  // @IsNumber()
  reasonIds: number[];

  recipientIds: number[];

  flowerTypeIds: number[];
}
