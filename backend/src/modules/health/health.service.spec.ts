import { Test, TestingModule } from '@nestjs/testing';
import { describe, beforeEach, it, expect } from 'vitest';
import { HealthService } from './health.service.js';

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthService],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return status ok', () => {
    const result = service.check();

    expect(result.status).toBe('ok');
  });

  it('should return the correct service name', () => {
    const result = service.check();

    expect(result.service).toBe('arroyo-alert-api');
  });

  it('should return a valid ISO timestamp', () => {
    const result = service.check();

    expect(new Date(result.timestamp).toISOString()).toBe(result.timestamp);
  });

  it('should return a non-negative integer uptime', () => {
    const result = service.check();

    expect(result.uptime).toBeGreaterThanOrEqual(0);
    expect(Number.isInteger(result.uptime)).toBe(true);
  });
});
