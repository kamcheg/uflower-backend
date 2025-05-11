import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFlowerTypeDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
