import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

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
  sitePhone: string;

  @IsNotEmpty()
  schedule: {
    from: string;
    to: string;
  };
}
