import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { ProxyService } from './proxy.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [ProxyService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.checkRequest()).toBe('Hello World!');
    });
  });
});
