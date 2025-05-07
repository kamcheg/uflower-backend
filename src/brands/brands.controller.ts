import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UserDecorator } from '../auth/decorators/user.decorator';
import { UserPayload } from '../common/types';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findMyBrand(@UserDecorator() user: UserPayload) {
    return this.brandsService.findOne(user.brand);
  }
}
