import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReasonsService } from './reasons.service';
import { CreateReasonDto } from './dto/create-reason.dto';
import { UpdateReasonDto } from './dto/update-reason.dto';

@Controller('reasons')
export class ReasonsController {
  constructor(private readonly reasonsService: ReasonsService) {}

  @Post()
  create(@Body() createReasonDto: CreateReasonDto) {
    return this.reasonsService.create(createReasonDto);
  }

  @Get()
  findAll() {
    return this.reasonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reasonsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReasonDto: UpdateReasonDto) {
    return this.reasonsService.update(+id, updateReasonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reasonsService.remove(+id);
  }
}
