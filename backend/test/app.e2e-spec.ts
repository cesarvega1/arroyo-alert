import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { describe, beforeAll, afterAll, it, expect } from 'vitest';
import request from 'supertest';
import type { Server } from 'node:http';
import { AppModule } from '../src/app.module.js';

describe('ARROYO ALERT API (e2e)', () => {
  let app: INestApplication<Server>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.setGlobalPrefix('api/v1');

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('API Information', () => {
    it('GET /api/v1 should return API information', async () => {
      await request(app.getHttpServer()).get('/api/v1').expect(200).expect({
        name: 'ARROYO ALERT API',
        version: '1.0.0',
        status: 'running',
        description: 'Citizen reporting and flood monitoring platform',
      });
    });
  });

  describe('Health Check', () => {
    it('GET /api/v1/health should return 200', async () => {
      await request(app.getHttpServer()).get('/api/v1/health').expect(200);
    });

    it('should return the correct health response', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/health')
        .expect(200);

      expect(response.body).toEqual({
        status: 'ok',
        service: 'arroyo-alert-api',
        timestamp: expect.any(String),
        uptime: expect.any(Number),
      });
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for a nonexistent route', async () => {
      await request(app.getHttpServer()).get('/api/v1/nonexistent').expect(404);
    });
  });
});
