import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SizesModule } from './sizes/sizes.module';

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
  ],
  controllers: [AppController],
})
export class AppModule {}
