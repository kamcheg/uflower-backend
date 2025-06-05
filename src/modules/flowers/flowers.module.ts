import { Module } from '@nestjs/common';
import { FlowersService } from './services/flowers.service';
import { FlowersController } from './flowers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flower } from './entities/flower.entity';
import { SizesModule } from '../sizes/sizes.module';
import { ReasonsModule } from '../reasons/reasons.module';
import { RecipientsModule } from '../recipients/recipients.module';
import { FlowerTypesModule } from '../flower-types/flower-types.module';
import { ImagesModule } from '../images/images.module';
import { BrandsModule } from '../brands/brands.module';
import { ClientFlowersService } from './services/client-flowers.service';
import { AdminFlowersService } from './services/admin-flowers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Flower]),
    FlowerTypesModule,
    RecipientsModule,
    ReasonsModule,
    SizesModule,
    ImagesModule,
    BrandsModule,
  ],
  controllers: [FlowersController],
  providers: [FlowersService, ClientFlowersService, AdminFlowersService],
  exports: [TypeOrmModule],
})
export class FlowersModule {}
