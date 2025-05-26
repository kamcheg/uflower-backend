import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateSubmissionDto {
  @Matches(/^7\d{10}$/, { message: 'Invalid phone number format' })
  phone: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
