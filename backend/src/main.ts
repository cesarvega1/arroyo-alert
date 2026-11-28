import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { AppModule } from './app.module.js';
import appConfig from './config/configuration/app.config.js';
import { setupApp } from './config/configuration/setup-app.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);

  setupApp(app);

  await app.listen(config.port);

  logger.log(`Environment: ${config.environment}`);
  logger.log(`ARROYO ALERT API is running on port ${config.port}`);
  logger.log(`API URL: http://localhost:${config.port}/${config.apiPrefix}`);
}

void bootstrap();
