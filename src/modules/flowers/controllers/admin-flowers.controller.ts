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
import { CreateFlowerDto } from '../dto/create-flower.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { UserDecorator } from '../../auth/decorators/user.decorator';
import { UserPayload } from '../../../common/types';
import { UpdateFlowerDto } from '../dto/update-flower.dto';
import { AdminFlowersService } from '../services/admin-flowers.service';

@Controller('flowers')
export class AdminFlowersController {
  constructor(private readonly adminFlowersService: AdminFlowersService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createFlowerDto: CreateFlowerDto,
    @UserDecorator() user: UserPayload,
  ) {
    return this.adminFlowersService.create(createFlowerDto, user.brand);
  }

  @UseGuards(AuthGuard)
  @Get('admin')
  findAllForAdmin(@UserDecorator() user: UserPayload) {
    return this.adminFlowersService.findAll(user.brand);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFlowerDto: UpdateFlowerDto,
    @UserDecorator() user: UserPayload,
  ) {
    return this.adminFlowersService.update({
      id: +id,
      updateFlowerDto,
      brandId: user.brand,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminFlowersService.remove(+id);
  }
}
