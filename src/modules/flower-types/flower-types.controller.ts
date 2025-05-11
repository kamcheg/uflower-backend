import { Controller, Get, Body, Param } from '@nestjs/common';
import { FlowerTypesService } from './flower-types.service';
import { CreateFlowerTypeDto } from './dto/create-flower-type.dto';
import { UpdateFlowerTypeDto } from './dto/update-flower-type.dto';

@Controller('flower-types')
export class FlowerTypesController {
  constructor(private readonly flowerTypesService: FlowerTypesService) {}

  create(@Body() createFlowerTypeDto: CreateFlowerTypeDto) {
    return this.flowerTypesService.create(createFlowerTypeDto);
  }

  @Get()
  findAll() {
    return this.flowerTypesService.findAll();
  }

  findOne(@Param('id') id: string) {
    return this.flowerTypesService.findOne(+id);
  }

  update(
    @Param('id') id: string,
    @Body() updateFlowerTypeDto: UpdateFlowerTypeDto,
  ) {
    return this.flowerTypesService.update(+id, updateFlowerTypeDto);
  }

  remove(@Param('id') id: string) {
    return this.flowerTypesService.remove(+id);
  }
}
