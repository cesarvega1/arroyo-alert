import { describe, it, expect } from 'vitest';
import { validate } from './env.validation.js';

describe('Environment validation', () => {
  const validConfig = {
    NODE_ENV: 'development',
    PORT: '3000',
    API_PREFIX: 'api/v1',
    DB_HOST: '127.0.0.1',
    DB_PORT: '5434',
    DB_USER: 'arroyo',
    DB_PASSWORD: 'mock_password',
    DB_NAME: 'arroyo_alert',
  };

  const testConfig = {
    ...validConfig,
    NODE_ENV: 'test',
    DB_PORT: '5435',
    DB_USER: 'arroyo_test',
    DB_NAME: 'arroyo_alert_test',
  };

  describe('Application configuration', () => {
    it('should validate a valid configuration', () => {
      expect(validate(validConfig)).toEqual({
        ...validConfig,
        PORT: 3000,
        DB_PORT: 5434,
      });
    });

    it('should use application default values', () => {
      const result = validate({
        ...validConfig,
        NODE_ENV: undefined,
        PORT: undefined,
        API_PREFIX: undefined,
      });

      expect(result.NODE_ENV).toBe('development');
      expect(result.PORT).toBe(3000);
      expect(result.API_PREFIX).toBe('api/v1');
    });

    it('should transform PORT into a number', () => {
      expect(validate(validConfig).PORT).toBe(3000);
    });

    it.each(['hello', '0', '-1', '65536', '3000.5', ''])(
      'should reject invalid application port: %s',
      (port) => {
        expect(() => validate({ ...validConfig, PORT: port })).toThrow(/PORT/);
      },
    );

    it.each(['development', 'production'])(
      'should accept environment: %s',
      (environment) => {
        expect(
          validate({ ...validConfig, NODE_ENV: environment }).NODE_ENV,
        ).toBe(environment);
      },
    );

    it('should reject an invalid environment', () => {
      expect(() => validate({ ...validConfig, NODE_ENV: 'invalid' })).toThrow(
        /NODE_ENV/,
      );
    });

    it.each(['', '   '])('should reject invalid API prefix: %s', (prefix) => {
      expect(() => validate({ ...validConfig, API_PREFIX: prefix })).toThrow(
        /API_PREFIX/,
      );
    });

    it('should remove unknown variables', () => {
      expect(
        validate({
          ...validConfig,
          UNKNOWN_VARIABLE: 'example',
        }),
      ).not.toHaveProperty('UNKNOWN_VARIABLE');
    });
  });

  describe('Database configuration', () => {
    it('should transform DB_PORT into a number', () => {
      expect(validate(validConfig).DB_PORT).toBe(5434);
    });

    it.each(['hello', '0', '-1', '65536', '5434.5', ''])(
      'should reject invalid database port: %s',
      (port) => {
        expect(() => validate({ ...validConfig, DB_PORT: port })).toThrow(
          /DB_PORT/,
        );
      },
    );

    it.each(['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'])(
      'should reject missing variable: %s',
      (key) => {
        expect(() => validate({ ...validConfig, [key]: undefined })).toThrow(
          new RegExp(key),
        );
      },
    );

    it.each(['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'])(
      'should reject empty variable: %s',
      (key) => {
        expect(() => validate({ ...validConfig, [key]: '' })).toThrow(
          new RegExp(key),
        );
      },
    );
  });

  describe('Testing database isolation', () => {
    it('should accept the testing database configuration', () => {
      const result = validate(testConfig);

      expect(result.NODE_ENV).toBe('test');
      expect(result.DB_PORT).toBe(5435);
      expect(result.DB_NAME).toBe('arroyo_alert_test');
      expect(result.DB_USER).toBe('arroyo_test');
    });

    it('should reject an invalid testing host', () => {
      expect(() =>
        validate({ ...testConfig, DB_HOST: '192.168.1.10' }),
      ).toThrow(/DB_HOST/);
    });

    it('should reject the development database port', () => {
      expect(() => validate({ ...testConfig, DB_PORT: '5434' })).toThrow(
        /DB_PORT/,
      );
    });

    it('should reject the development database name', () => {
      expect(() =>
        validate({ ...testConfig, DB_NAME: 'arroyo_alert' }),
      ).toThrow(/DB_NAME/);
    });

    it('should reject the development database user', () => {
      expect(() => validate({ ...testConfig, DB_USER: 'arroyo' })).toThrow(
        /DB_USER/,
      );
    });

    it('should reject development credentials in testing', () => {
      expect(() => validate({ ...validConfig, NODE_ENV: 'test' })).toThrow();
    });
  });
});
