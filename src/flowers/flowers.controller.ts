import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UserDecorator } from '../auth/decorators/user.decorator';
import { UserPayload } from '../common/types';
import { UpdateFlowerDto } from './dto/update-flower.dto';

@Controller('flowers')
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createFlowerDto: CreateFlowerDto,
    @UserDecorator() user: UserPayload,
  ) {
    return this.flowersService.create(createFlowerDto, user.brand);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@UserDecorator() user: UserPayload) {
    return this.flowersService.findAll(user.brand);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.flowersService.findOne(+id);
  // }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFlowerDto: UpdateFlowerDto,
    @UserDecorator() user: UserPayload,
  ) {
    return this.flowersService.update({
      id: +id,
      updateFlowerDto,
      brandId: user.brand,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flowersService.remove(+id);
  }
}
