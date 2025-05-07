import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateLogoDto {
  @IsNotEmpty()
  @IsString()
  logo: string;
}
