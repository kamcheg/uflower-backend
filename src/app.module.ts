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
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { OrdersModule } from './orders/orders.module';
import { OrderFlowersModule } from './order-flowers/order-flowers.module';

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
  controllers: [AppController],
})
export class AppModule {}
