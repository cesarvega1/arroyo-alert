import { z } from 'zod';

export const envSchema = z
  .object({
    // Application configuration
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),

    PORT: z.coerce.number().int().min(1).max(65535).default(3000),

    API_PREFIX: z.string().trim().min(1).default('api/v1'),

    // Database configuration
    DB_HOST: z.string().trim().min(1),

    DB_PORT: z.coerce.number().int().min(1).max(65535),

    DB_USER: z.string().trim().min(1),

    DB_PASSWORD: z.string().min(1),

    DB_NAME: z.string().trim().min(1),
  })
  .superRefine((env, ctx) => {
    if (env.NODE_ENV === 'test') {
      if (env.DB_HOST !== '127.0.0.1') {
        ctx.addIssue({
          code: 'custom',
          path: ['DB_HOST'],
          message: 'Testing must use the local database host',
        });
      }

      if (env.DB_PORT !== 5435) {
        ctx.addIssue({
          code: 'custom',
          path: ['DB_PORT'],
          message: 'Testing must use database port 5435',
        });
      }

      if (env.DB_NAME !== 'arroyo_alert_test') {
        ctx.addIssue({
          code: 'custom',
          path: ['DB_NAME'],
          message: 'Testing must use arroyo_alert_test',
        });
      }

      if (env.DB_USER !== 'arroyo_test') {
        ctx.addIssue({
          code: 'custom',
          path: ['DB_USER'],
          message: 'Testing must use arroyo_test',
        });
      }
    }
  });
export type EnvConfig = z.infer<typeof envSchema>;
