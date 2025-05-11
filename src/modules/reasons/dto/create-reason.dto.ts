import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReasonDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
