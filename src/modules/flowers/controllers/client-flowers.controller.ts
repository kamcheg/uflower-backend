import { Controller, Get, Param, Query } from '@nestjs/common';
import { FlowersService } from '../services/flowers.service';
import { FlowersFilterDto } from '../dto/query-flower.dto';
import { Domain } from '../../../common/domain.decorator';
import { ClientFlowersService } from '../services/client-flowers.service';

@Controller('flowers')
export class ClientFlowersController {
  constructor(
    private readonly flowersService: FlowersService,
    private readonly clientFlowersService: ClientFlowersService,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: string, @Domain() domain: string) {
    return this.flowersService.findOne({ id: +id, domain });
  }

  @Get('find-by-ids')
  findByIds(@Domain() domain: string, @Query('ids') ids: string[] = []) {
    return this.flowersService.findByIds({
      domain,
      ids,
    });
  }

  @Get()
  findAll(@Query() filters: FlowersFilterDto, @Domain() domain: string) {
    return this.clientFlowersService.findAll({ domain, filters });
  }
}
