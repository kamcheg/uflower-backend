import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FlowerTypesService } from './flower-types.service';
import { CreateFlowerTypeDto } from './dto/create-flower-type.dto';
import { UpdateFlowerTypeDto } from './dto/update-flower-type.dto';

@Controller('flower-types')
export class FlowerTypesController {
  constructor(private readonly flowerTypesService: FlowerTypesService) {}

  @Post()
  create(@Body() createFlowerTypeDto: CreateFlowerTypeDto) {
    return this.flowerTypesService.create(createFlowerTypeDto);
  }

  @Get()
  findAll() {
    return this.flowerTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flowerTypesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFlowerTypeDto: UpdateFlowerTypeDto,
  ) {
    return this.flowerTypesService.update(+id, updateFlowerTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flowerTypesService.remove(+id);
  }
}
