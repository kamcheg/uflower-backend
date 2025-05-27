import { Controller, Get, Body, Param } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';

@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  create(@Body() createSizeDto: CreateSizeDto) {
    return this.sizesService.create(createSizeDto);
  }

  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(Role.Owner, Role.Florist)
  @Get()
  findAll() {
    return this.sizesService.findAll();
  }

  findOne(@Param('id') id: string) {
    return this.sizesService.findOne(+id);
  }

  update(@Param('id') id: string, @Body() updateSizeDto: UpdateSizeDto) {
    return this.sizesService.update(+id, updateSizeDto);
  }

  remove(@Param('id') id: string) {
    return this.sizesService.remove(+id);
  }
}
