import { Module } from '@nestjs/common';
import { FlowerTypesService } from './flower-types.service';
import { FlowerTypesController } from './flower-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowerType } from './entities/flower-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FlowerType])],
  controllers: [FlowerTypesController],
  providers: [FlowerTypesService],
  exports: [FlowerTypesService],
})
export class FlowerTypesModule {}
