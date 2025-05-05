import { PartialType } from '@nestjs/mapped-types';
import { CreateFlowerTypeDto } from './create-flower-type.dto';

export class UpdateFlowerTypeDto extends PartialType(CreateFlowerTypeDto) {}
