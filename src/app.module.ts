import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SizesModule } from './modules/sizes/sizes.module';
import { RecipientsModule } from './modules/recipients/recipients.module';
import { FlowerTypesModule } from './modules/flower-types/flower-types.module';
import { ReasonsModule } from './modules/reasons/reasons.module';
import { FlowersModule } from './modules/flowers/flowers.module';
import { ImagesModule } from './modules/images/images.module';
import { BrandsModule } from './modules/brands/brands.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ShopsModule } from './modules/shops/shops.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderFlowersModule } from './modules/order-flowers/order-flowers.module';

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Указывает физическую директорию
      serveRoot: '/uploads', // Указывает по какому URL пути можно будет получить доступ к этим файлам
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
    OrdersModule,
    OrderFlowersModule,
  ],
})
export class AppModule {}
