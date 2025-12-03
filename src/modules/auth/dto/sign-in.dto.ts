import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class SignInDto {
  @Matches(/^7\d{10}$/, { message: 'Invalid phone number format' })
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
