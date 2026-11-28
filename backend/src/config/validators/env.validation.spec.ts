import { describe, it, expect } from 'vitest';
import { validate } from './env.validation.js';

describe('Environment validation', () => {
  const validConfig = {
    NODE_ENV: 'development',
    PORT: '3000',
    API_PREFIX: 'api/v1',
  };

  it('should validate a valid configuration', () => {
    expect(validate(validConfig)).toEqual({
      NODE_ENV: 'development',
      PORT: 3000,
      API_PREFIX: 'api/v1',
    });
  });

  it('should use default values when variables are missing', () => {
    expect(validate({})).toEqual({
      NODE_ENV: 'development',
      PORT: 3000,
      API_PREFIX: 'api/v1',
    });
  });

  it('should transform PORT into a number', () => {
    const result = validate({
      ...validConfig,
      PORT: '4000',
    });

    expect(result.PORT).toBe(4000);
    expect(typeof result.PORT).toBe('number');
  });

  it.each(['hello', '0', '-1', '65536', '3000.5', ''])(
    'should reject invalid port: %s',
    (port) => {
      expect(() =>
        validate({
          ...validConfig,
          PORT: port,
        }),
      ).toThrow(/PORT/);
    },
  );

  it.each(['development', 'test', 'production'])(
    'should accept environment: %s',
    (environment) => {
      const result = validate({
        ...validConfig,
        NODE_ENV: environment,
      });

      expect(result.NODE_ENV).toBe(environment);
    },
  );

  it('should reject an invalid environment', () => {
    expect(() =>
      validate({
        ...validConfig,
        NODE_ENV: 'invalid',
      }),
    ).toThrow(/NODE_ENV/);
  });

  it('should reject an empty API prefix', () => {
    expect(() =>
      validate({
        ...validConfig,
        API_PREFIX: '',
      }),
    ).toThrow(/API_PREFIX/);
  });

  it('should reject a whitespace-only API prefix', () => {
    expect(() =>
      validate({
        ...validConfig,
        API_PREFIX: '   ',
      }),
    ).toThrow(/API_PREFIX/);
  });

  it('should remove unknown environment variables', () => {
    const result = validate({
      ...validConfig,
      UNKNOWN_VARIABLE: 'example',
    });

    expect(result).not.toHaveProperty('UNKNOWN_VARIABLE');
  });
});
