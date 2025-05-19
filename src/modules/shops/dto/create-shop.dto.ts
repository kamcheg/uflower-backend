import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { IWorkTime } from '../../../common/types';
import { Type } from 'class-transformer';

class ScheduleDto implements IWorkTime {
  @IsString()
  from: string;

  @IsString()
  to: string;

  @IsBoolean()
  isAlwaysOpened: boolean;
}

export class CreateShopDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^7\d{10}$/, { message: 'Invalid phone number format' })
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
