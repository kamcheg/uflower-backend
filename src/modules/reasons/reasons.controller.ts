import { Controller, Get, Body, Param } from '@nestjs/common';
import { ReasonsService } from './reasons.service';
import { CreateReasonDto } from './dto/create-reason.dto';
import { UpdateReasonDto } from './dto/update-reason.dto';

@Controller('reasons')
export class ReasonsController {
  constructor(private readonly reasonsService: ReasonsService) {}

  create(@Body() createReasonDto: CreateReasonDto) {
    return this.reasonsService.create(createReasonDto);
  }

  @Get()
  findAll() {
    return this.reasonsService.findAll();
  }

  findOne(@Param('id') id: string) {
    return this.reasonsService.findOne(+id);
  }

  update(@Param('id') id: string, @Body() updateReasonDto: UpdateReasonDto) {
    return this.reasonsService.update(+id, updateReasonDto);
  }

  remove(@Param('id') id: string) {
    return this.reasonsService.remove(+id);
  }
}
