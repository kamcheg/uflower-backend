import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SizesModule } from './sizes/sizes.module';
import { RecipientsModule } from './recipients/recipients.module';
import { FlowerTypesModule } from './flower-types/flower-types.module';
import { ReasonsModule } from './reasons/reasons.module';
import { FlowersModule } from './flowers/flowers.module';
import { ImagesModule } from './images/images.module';
import { BrandsModule } from './brands/brands.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ShopsModule } from './shops/shops.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'todo',
      synchronize: true,
      autoLoadEntities: true,
    }),
    SizesModule,
    RecipientsModule,
    FlowerTypesModule,
    ReasonsModule,
    FlowersModule,
    ImagesModule,
    BrandsModule,
    AuthModule,
    UsersModule,
    ShopsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
