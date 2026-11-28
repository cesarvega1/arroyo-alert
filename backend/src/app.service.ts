import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      name: 'ARROYO ALERT API',
      version: '1.0.0',
      status: 'running',
      description: 'Citizen reporting and flood monitoring platform',
    };
  }
}
