import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flower } from './entities/flower.entity';
import { SizesModule } from '../sizes/sizes.module';
import { ReasonsModule } from '../reasons/reasons.module';
import { RecipientsModule } from '../recipients/recipients.module';
import { FlowerTypesModule } from '../flower-types/flower-types.module';
import { ImagesModule } from '../images/images.module';
import { FlowersService } from './services/flowers.service';
import { FlowersController } from './controllers/flowers.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Flower]),
    FlowerTypesModule,
    RecipientsModule,
    ReasonsModule,
    SizesModule,
    ImagesModule,
  ],
  controllers: [FlowersController],
  providers: [FlowersService],
  exports: [TypeOrmModule],
})
export class FlowersModule {}
