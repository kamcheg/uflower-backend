import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { initSwagger } from './common/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
// import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  // app.use(express.json());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // удаляет неописанные поля из DTO
      transform: true, // преобразует payload в нужный тип
    }),
  );

  initSwagger(app);

  app.set('query parser', 'extended');

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
