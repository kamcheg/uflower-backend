import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UserDecorator } from '../auth/decorators/user.decorator';
import { UserPayload } from '../common/types';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createShopDto: CreateShopDto,
    @UserDecorator() user: UserPayload,
  ) {
    return this.shopsService.create(createShopDto, user.brand);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateShopDto) {
    return this.shopsService.update(+id, updateDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @UserDecorator() user: UserPayload) {
    return this.shopsService.remove(+id, user.brand);
  }
}
