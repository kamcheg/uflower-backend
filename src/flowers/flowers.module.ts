import { Module } from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { FlowersController } from './flowers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flower } from './entities/flower.entity';
import { SizesModule } from '../sizes/sizes.module';
import { ReasonsModule } from '../reasons/reasons.module';

@Module({
  imports: [ReasonsModule, SizesModule, TypeOrmModule.forFeature([Flower])],
  controllers: [FlowersController],
  providers: [FlowersService],
})
export class FlowersModule {}
