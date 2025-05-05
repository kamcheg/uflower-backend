import { IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';

export class CreateFlowerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  sizeId: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsArray()
  @IsNumber({}, { each: true })
  reasonIds: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  recipientIds: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  flowerTypeIds: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  imageIds: number[];
}
