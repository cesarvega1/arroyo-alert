import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Bootstrap');

  app.setGlobalPrefix('api/v1');

  const port = 3000;

  await app.listen(port);

  logger.log(`ARROYO ALERT API is running on port ${port}`);
  logger.log(`API URL: http://localhost:${port}/api/v1`);
}
await bootstrap();
