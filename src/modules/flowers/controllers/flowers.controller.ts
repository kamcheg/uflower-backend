import {
  Delete,
  Patch,
  Body,
  Controller,
  Get,
  Query,
  Param,
  Post,
} from '@nestjs/common';
import { FlowersFilterDto } from '../dto/query-flower.dto';
import { FlowersService } from '../services/flowers.service';
import { UpdateFlowerDto } from '../dto/update-flower.dto';
import { CreateFlowerDto } from '../dto/create-flower.dto';

@Controller('flowers')
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) {}

  @Get()
  findAll(@Query() filters: FlowersFilterDto) {
    return this.flowersService.findAll({ filters });
  }

  @Get('find-by-ids')
  findByIds(@Query('ids') ids: string[] = []) {
    return this.flowersService.findByIds({
      ids,
    });
  }

  @Get('admin')
  findAllForAdmin() {
    return this.flowersService.findAllForAdmin();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flowersService.findOne({ id: +id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlowerDto: UpdateFlowerDto) {
    return this.flowersService.update({
      id: +id,
      updateFlowerDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flowersService.remove(+id);
  }

  @Post()
  create(@Body() createFlowerDto: CreateFlowerDto) {
    return this.flowersService.create(createFlowerDto);
  }
}
