import { Test, TestingModule } from '@nestjs/testing';
import { ServiceUnavailableException } from '@nestjs/common';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { HealthController } from './health.controller.js';
import { HealthService } from './health.service.js';

describe('HealthController', () => {
  let controller: HealthController;

  const mockHealthResponse = {
    status: 'ok',
    service: 'arroyo-alert-api',
    timestamp: '2026-11-28T18:00:00.000Z',
    uptime: 100,
    database: {
      status: 'up',
    },
  };

  const mockHealthService = {
    check: vi.fn(),
  };

  beforeEach(async () => {
    vi.resetAllMocks();

    mockHealthService.check.mockResolvedValue(mockHealthResponse);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthService,
          useValue: mockHealthService,
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the health status', async () => {
    const result = await controller.check();

    expect(result).toEqual(mockHealthResponse);
  });

  it('should call HealthService.check once', async () => {
    await controller.check();

    expect(mockHealthService.check).toHaveBeenCalledTimes(1);
  });

  it('should propagate ServiceUnavailableException', async () => {
    mockHealthService.check.mockRejectedValue(
      new ServiceUnavailableException('Database unavailable'),
    );

    await expect(controller.check()).rejects.toThrow(
      ServiceUnavailableException,
    );
  });
});
