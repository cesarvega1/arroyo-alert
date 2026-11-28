import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import type { ConfigType } from '@nestjs/config';
import databaseConfig from '../config/configuration/database.config.js';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [databaseConfig.KEY],

      useFactory: (config: ConfigType<typeof databaseConfig>) => ({
        type: 'postgres',
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.database,

        autoLoadEntities: true,
        synchronize: false,
        dropSchema: false,
        migrationsRun: false,

        retryAttempts: 3,
        retryDelay: 3000,
      }),
    }),
  ],
})
export class DatabaseModule {}
