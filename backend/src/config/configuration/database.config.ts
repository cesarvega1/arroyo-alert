import { registerAs } from '@nestjs/config';
import { validate } from '../validators/env.validation.js';

export default registerAs('database', () => {
  const env = validate(process.env);

  return {
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  };
});
