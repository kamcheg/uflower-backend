import { Controller, Get } from '@nestjs/common';
import { ReasonsService } from './reasons.service';

@Controller('reasons')
export class ReasonsController {
  constructor(private readonly reasonsService: ReasonsService) {}

  @Get()
  findAll() {
    return this.reasonsService.findAll();
  }
}
