import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),

  PORT: z.coerce.number().int().min(1).max(65535).default(3000),

  API_PREFIX: z.string().trim().min(1).default('api/v1'),
});

export type EnvConfig = z.infer<typeof envSchema>;
