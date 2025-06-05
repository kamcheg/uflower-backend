import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { BrandsService } from '../services/brands.service';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { Role } from '../../auth/role.enum';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';

@Controller('/superadmin/brands')
export class SuperadminBrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SuperAdmin)
  @Get('')
  findAll() {
    return this.brandsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }
}
