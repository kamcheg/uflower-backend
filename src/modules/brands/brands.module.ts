import { Module } from '@nestjs/common';
import { BrandsService } from './services/brands.service';
import { BrandsController } from './controllers/brands.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { SuperadminBrandsController } from './controllers/superadmin-brands.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  controllers: [SuperadminBrandsController, BrandsController],
  providers: [BrandsService],
  exports: [BrandsService],
})
export class BrandsModule {}
