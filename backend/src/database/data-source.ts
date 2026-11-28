import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { loadEnvFile } from 'node:process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { validate } from '../config/validators/env.validation.js';

const isTest = process.env.NODE_ENV === 'test';

const envFile = isTest ? '.env.test' : '.env';

if (existsSync(envFile)) {
  loadEnvFile(envFile);
}

const env = validate(process.env);

export default new DataSource({
  type: 'postgres',

  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,

  entities: [
    fileURLToPath(new URL('../modules/**/*.entity.js', import.meta.url)),
  ],

  migrations: [fileURLToPath(new URL('./migrations/*.js', import.meta.url))],

  migrationsTableName: 'typeorm_migrations',

  synchronize: false,
  dropSchema: false,
  migrationsRun: false,

  logging: false,
});
