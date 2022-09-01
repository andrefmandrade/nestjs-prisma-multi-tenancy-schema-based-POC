import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.PORT || 4000, '0.0.0.0', () =>
    logger.log('HTTP Service is listening'),
  );
}
bootstrap();
