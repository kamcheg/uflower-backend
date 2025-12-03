import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SizesModule } from './modules/sizes/sizes.module';
import { RecipientsModule } from './modules/recipients/recipients.module';
import { FlowerTypesModule } from './modules/flower-types/flower-types.module';
import { ReasonsModule } from './modules/reasons/reasons.module';
import { FlowersModule } from './modules/flowers/flowers.module';
import { ImagesModule } from './modules/images/images.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderFlowersModule } from './modules/order-flowers/order-flowers.module';
import { TelegramModule } from './modules/telegram/telegram.module';
import { TelegrafModule } from 'nestjs-telegraf';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Указывает физическую директорию
      serveRoot: '/uploads', // Указывает по какому URL пути можно будет получить доступ к этим файлам
    }),
    TelegrafModule.forRoot({
      token: '8014844446:AAH5U4LFzMhlCvllHW8AXRg8UhHwMTGZ52w', // TODO ENV
    }),
    SizesModule,
    RecipientsModule,
    FlowerTypesModule,
    ReasonsModule,
    FlowersModule,
    AuthModule,
    UsersModule,
    ImagesModule,
    OrdersModule,
    OrderFlowersModule,
    TelegramModule,
  ],
})
export class AppModule {}
