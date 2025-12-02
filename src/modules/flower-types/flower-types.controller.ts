import { Controller, Get } from '@nestjs/common';
import { FlowerTypesService } from './flower-types.service';

@Controller('flower-types')
export class FlowerTypesController {
  constructor(private readonly flowerTypesService: FlowerTypesService) {}

  @Get()
  findAll() {
    return this.flowerTypesService.findAll();
  }
}
