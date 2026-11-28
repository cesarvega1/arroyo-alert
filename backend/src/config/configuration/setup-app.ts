import type { INestApplication } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import appConfig from './app.config.js';

export function setupApp(app: INestApplication): void {
  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);

  app.setGlobalPrefix(config.apiPrefix);
}
