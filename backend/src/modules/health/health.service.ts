import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class HealthService {
  constructor(private readonly dataSource: DataSource) {}

  async check() {
    const health = {
      service: 'arroyo-alert-api',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
    };

    try {
      await this.dataSource.query('SELECT 1');

      return {
        status: 'ok',
        ...health,
        database: {
          status: 'up',
        },
      };
    } catch {
      throw new ServiceUnavailableException({
        status: 'error',
        ...health,
        database: {
          status: 'down',
        },
      });
    }
  }
}
