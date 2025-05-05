import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // удаляет неописанные поля из DTO
      transform: true, // преобразует payload в нужный тип
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
