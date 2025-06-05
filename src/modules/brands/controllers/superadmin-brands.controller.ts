import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { BrandsService } from '../services/brands.service';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { SuperAdminGuard } from '../../auth/guards/superadmin.guard';

@Controller('/superadmin/brands')
export class SuperadminBrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @UseGuards(SuperAdminGuard)
  @Get('')
  findAll() {
    return this.brandsService.findAll();
  }

  @UseGuards(SuperAdminGuard)
  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }
}
