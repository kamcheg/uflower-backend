import { Controller, Get, Query, Param } from '@nestjs/common';
import { FlowersFilterDto } from '../dto/query-flower.dto';
import { FlowersService } from '../services/flowers.service';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flowersService.findOne({ id: +id });
  }
}
