import { Test, TestingModule } from '@nestjs/testing';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { HealthController } from './health.controller.js';
import { HealthService } from './health.service.js';

describe('HealthController', () => {
  let controller: HealthController;

  const mockHealthResponse = {
    status: 'ok',
    service: 'arroyo-alert-api',
    timestamp: '2026-11-28T16:00:00.000Z',
    uptime: 100,
  };

  const mockHealthService = {
    check: vi.fn().mockReturnValue(mockHealthResponse),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

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

  it('should return the health status', () => {
    expect(controller.check()).toEqual(mockHealthResponse);
  });

  it('should call HealthService.check once', () => {
    controller.check();

    expect(mockHealthService.check).toHaveBeenCalledTimes(1);
  });
});
