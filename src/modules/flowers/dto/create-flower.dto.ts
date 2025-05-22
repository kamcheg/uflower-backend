import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  IsOptional,
  IsBoolean,
  Min,
  Max,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class IngredientDto {
  @IsNotEmpty()
  @IsString()
  value: string;

  @IsNumber()
  @Min(0)
  quantity: number;
}

export class CreateFlowerDto {
  @ApiProperty({ type: String, example: 'Название букета' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, example: 'Описание букета' })
  @IsOptional()
  description: string;

  @ApiProperty({ type: Number, example: 1000 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ type: Boolean, example: true })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ type: Boolean, example: true })
  @IsBoolean()
  inStock: boolean;

  @ApiProperty({ type: Number, example: 60, default: 0 })
  @IsNumber()
  width: number;

  @ApiProperty({ type: Number, example: 110, default: 0 })
  @IsNumber()
  height: number;

  @ApiProperty({ type: Number, example: 11, default: 0 })
  @IsNumber()
  @Min(-100000)
  @Max(100000)
  priority: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  ingredients: IngredientDto[];

  @ApiProperty({ type: Number, example: 1 })
  @IsNotEmpty()
  @IsNumber()
  sizeId: number;

  @ApiProperty({ type: [Number], example: [1, 2, 3] })
  @IsArray()
  @IsNumber({}, { each: true })
  reasonIds: number[];

  @ApiProperty({ type: [Number], example: [1, 2, 3] })
  @IsArray()
  @IsNumber({}, { each: true })
  recipientIds: number[];

  @ApiProperty({ type: [Number], example: [1, 2, 3] })
  @IsArray()
  @IsNumber({}, { each: true })
  flowerTypeIds: number[];

  @ApiProperty({
    type: [String],
    example: ['image.jpeg', 'image.png'],
  })
  @IsArray()
  @IsString({ each: true })
  images: string[];
}
