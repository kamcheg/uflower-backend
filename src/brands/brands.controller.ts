import { Controller, Get, Post, Body, UseGuards, Patch } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UserDecorator } from '../auth/decorators/user.decorator';
import { UserPayload } from '../common/types';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { UpdateLogoDto } from './dto/update-logo.dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @UseGuards(AuthGuard)
  @Post('change-logo')
  changeLogo(@UserDecorator() user: UserPayload, @Body() dto: UpdateLogoDto) {
    return this.brandsService.changeLogo(user.brand, dto);
  }

  @UseGuards(AuthGuard)
  @Get()
  find(@UserDecorator() user: UserPayload) {
    return this.brandsService.findOne(user.brand);
  }

  @UseGuards(AuthGuard)
  @Patch()
  update(
    @Body() updateDto: UpdateBrandDto,
    @UserDecorator() user: UserPayload,
  ) {
    return this.brandsService.update(user.brand, updateDto);
  }
}
