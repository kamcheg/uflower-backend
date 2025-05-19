import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { IWorkTime } from '../../../common/types';

export class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  slug: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^7\d{10}$/, { message: 'Invalid phone number format' })
  sitePhone: string;

  @IsNotEmpty()
  schedule: IWorkTime;
}
