import { Test, TestingModule } from '@nestjs/testing';
import { ServiceUnavailableException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { HealthService } from './health.service.js';

describe('HealthService', () => {
  let service: HealthService;

  const mockDataSource = {
    query: vi.fn(),
  };

  beforeEach(async () => {
    vi.resetAllMocks();

    mockDataSource.query.mockResolvedValue([{ '?column?': 1 }]);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return status ok', async () => {
    const result = await service.check();

    expect(result.status).toBe('ok');
  });

  it('should return the correct service name', async () => {
    const result = await service.check();

    expect(result.service).toBe('arroyo-alert-api');
  });

  it('should return a valid ISO timestamp', async () => {
    const result = await service.check();

    expect(new Date(result.timestamp).toISOString()).toBe(result.timestamp);
  });

  it('should return a non-negative integer uptime', async () => {
    const result = await service.check();

    expect(result.uptime).toBeGreaterThanOrEqual(0);
    expect(Number.isInteger(result.uptime)).toBe(true);
  });

  it('should return database status up', async () => {
    const result = await service.check();

    expect(result.database.status).toBe('up');
  });

  it('should execute the database health query', async () => {
    await service.check();

    expect(mockDataSource.query).toHaveBeenCalledWith('SELECT 1');
    expect(mockDataSource.query).toHaveBeenCalledTimes(1);
  });

  it('should throw ServiceUnavailableException when database is down', async () => {
    mockDataSource.query.mockRejectedValue(
      new Error('Database connection failed'),
    );

    await expect(service.check()).rejects.toThrow(ServiceUnavailableException);
  });

  it('should return database status down when connection fails', async () => {
    mockDataSource.query.mockRejectedValue(
      new Error('Database connection failed'),
    );

    await expect(service.check()).rejects.toMatchObject({
      response: {
        status: 'error',
        database: {
          status: 'down',
        },
      },
    });
  });
});
