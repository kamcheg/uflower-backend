import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowerDto {
  @ApiProperty({ type: String, example: 'Название букета' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, example: 'Описание букета' })
  @IsOptional()
  description: string;

  @ApiProperty({ type: Number, example: 1 })
  @IsNotEmpty()
  @IsNumber()
  sizeId: number;

  // @ApiProperty({ type: Boolean, example: true })
  // @IsBoolean()
  // isActive: number;

  @ApiProperty({ type: Number, example: 1000 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

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
