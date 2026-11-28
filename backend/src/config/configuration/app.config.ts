import { registerAs } from '@nestjs/config';
import { validate } from '../validators/env.validation.js';

export default registerAs('app', () => {
  const env = validate(process.env);

  return {
    environment: env.NODE_ENV,
    port: env.PORT,
    apiPrefix: env.API_PREFIX,
  };
});
