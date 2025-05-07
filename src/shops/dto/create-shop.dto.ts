import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IWorkTime } from '../../common/types';
import { Type } from 'class-transformer';

class ScheduleDto implements IWorkTime {
  @IsNotEmpty()
  @IsString()
  from: string;

  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNotEmpty()
  @IsBoolean()
  isAlwaysOpened: boolean;
}

export class CreateShopDto {
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ScheduleDto)
  schedule: ScheduleDto;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber({}, { each: true })
  coords: [number, number];
}
