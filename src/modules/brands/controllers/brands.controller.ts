import { Controller, Get, Post, Body, UseGuards, Patch } from '@nestjs/common';
import { BrandsService } from '../services/brands.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { UserDecorator } from '../../auth/decorators/user.decorator';
import { UserPayload } from '../../../common/types';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { UpdateLogoDto } from '../dto/update-logo.dto';
import { Domain } from '../../../common/domain.decorator';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @UseGuards(AuthGuard)
  @Get()
  find(@UserDecorator() user: UserPayload) {
    return this.brandsService.findOne(user.brand);
  }

  @UseGuards(AuthGuard)
  @Post('change-logo')
  changeLogo(@UserDecorator() user: UserPayload, @Body() dto: UpdateLogoDto) {
    return this.brandsService.changeLogo(user.brand, dto);
  }

  @Get('about')
  about(@Domain() domain: string) {
    return this.brandsService.findOneByDomain(domain);
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
