import { Module } from '@nestjs/common';
import { FlowersService } from './services/flowers.service';
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
import { AdminFlowersController } from './controllers/admin-flowers.controller';
import { ClientFlowersController } from './controllers/client-flowers.controller';

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
  controllers: [AdminFlowersController, ClientFlowersController],
  providers: [FlowersService, ClientFlowersService, AdminFlowersService],
  exports: [TypeOrmModule],
})
export class FlowersModule {}
