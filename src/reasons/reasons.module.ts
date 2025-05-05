import { Module } from '@nestjs/common';
import { ReasonsService } from './reasons.service';
import { ReasonsController } from './reasons.controller';
import { Reason } from './entities/reason.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Reason])],
  controllers: [ReasonsController],
  providers: [ReasonsService],
})
export class ReasonsModule {}
