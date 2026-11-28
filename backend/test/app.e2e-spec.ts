import type { Server } from 'node:http';
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { describe, beforeAll, afterAll, it, expect } from 'vitest';
import request from 'supertest';

import { AppModule } from '../src/app.module.js';
import { setupApp } from '../src/config/configuration/setup-app.js';

describe('App (e2e)', () => {
  let app: INestApplication<Server>;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    setupApp(app);

    await app.init();

    dataSource = app.get(DataSource);

    const rows: { database: string; username: string }[] =
      await dataSource.query(
        'SELECT current_database() AS database, current_user AS username',
      );

    if (
      process.env.NODE_ENV !== 'test' ||
      rows[0]?.database !== 'arroyo_alert_test' ||
      rows[0]?.username !== 'arroyo_test'
    ) {
      await app.close();

      throw new Error('Unsafe testing database connection');
    }
  });

  afterAll(async () => {
    if (app && dataSource?.isInitialized) {
      await app.close();
    }
  });

  it('GET /api/v1 should return API information', async () => {
    await request(app.getHttpServer()).get('/api/v1').expect(200).expect({
      name: 'ARROYO ALERT API',
      version: '1.0.0',
      status: 'running',
      description: 'Citizen reporting and flood monitoring platform',
    });
  });

  it('GET /api/v1/health should return HTTP 200', async () => {
    await request(app.getHttpServer()).get('/api/v1/health').expect(200);
  });

  it('GET /api/v1/health should return health information', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(200);

    expect(response.body).toEqual({
      status: 'ok',
      service: 'arroyo-alert-api',
      timestamp: expect.any(String),
      uptime: expect.any(Number),
      database: {
        status: 'up',
      },
    });
  });

  it('should connect to the testing database', () => {
    expect(dataSource.isInitialized).toBe(true);
    expect(dataSource.options.database).toBe('arroyo_alert_test');
  });

  it('should have PostGIS enabled', async () => {
    const rows: { enabled: boolean }[] = await dataSource.query(
      "SELECT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'postgis') AS enabled",
    );

    expect(rows[0]?.enabled).toBe(true);
  });

  it('should have the PostGIS migration registered', async () => {
    const rows: { name: string }[] = await dataSource.query(
      'SELECT name FROM typeorm_migrations',
    );

    expect(rows).toContainEqual({
      name: 'EnablePostGIS1795890080624',
    });
  });

  it('GET /api/v1/unknown should return HTTP 404', async () => {
    await request(app.getHttpServer()).get('/api/v1/unknown').expect(404);
  });
});
