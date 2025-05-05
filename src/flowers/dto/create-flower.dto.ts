import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateFlowerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  description: string;

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
