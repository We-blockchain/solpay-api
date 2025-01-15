import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ApiConfig } from './api.config';

describe('ApiController', () => {
  let apiController: ApiController;
  let apiConfig: ApiConfig;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [ApiService, ApiConfig],
    }).compile();

    apiController = app.get<ApiController>(ApiController);

    apiConfig = app.get<ApiConfig>(ApiConfig);
    apiConfig.setSolanaCluster('devnet');
    apiConfig.account = 'BSzG62Khqw5pbbWPmoe8iZekExekFQBJmjYhiXhcVvtS';
  });

  describe('root', () => {
    it('should return order"', async () => {
      apiConfig.account = '5R32WVg8XPuiHvqcuM3pfMag2v7D14MFxR4divWkJAZK';
      expect(await apiController.createOrder({
        coin: 'SOL',
        amount: 0.1,
      })).toBeInstanceOf(Object);
    });
  });
});
