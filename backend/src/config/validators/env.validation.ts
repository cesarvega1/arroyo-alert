import { envSchema, type EnvConfig } from '../schemas/env.schema.js';

export function validate(config: Record<string, unknown>): EnvConfig {
  const result = envSchema.safeParse(config);

  if (!result.success) {
    const errors = result.error.issues
      .map((issue) => {
        return `${issue.path.join('.')}: ${issue.message}`;
      })
      .join('\n');

    throw new Error(`Invalid environment configuration:\n${errors}`);
  }

  return result.data;
}
