import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should return Api information', () => {
    expect(appController.getHello()).toEqual({
      name: 'ARROYO ALERT API',
      version: '1.0.0',
      status: 'running',
      description: 'Citizen reporting and flood monitoring platform',
    });
  });
});
