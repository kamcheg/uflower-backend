import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { initSwagger } from './common/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
// import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // удаляет неописанные поля из DTO
      transform: true, // преобразует payload в нужный тип
    }),
  );

  initSwagger(app);

  // парсит ids[]
  app.set('query parser', 'extended');

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
