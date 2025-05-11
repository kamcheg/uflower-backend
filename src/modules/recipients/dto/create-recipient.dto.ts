import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRecipientDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
