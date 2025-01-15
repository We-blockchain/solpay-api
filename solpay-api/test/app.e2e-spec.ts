import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ApiConfig } from './../src/api/api.config';
import { ApiModule } from './../src';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let apiConfig: ApiConfig;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    apiConfig = await app.get(ApiConfig);
    apiConfig.setSolanaCluster('devnet');
    apiConfig.account = 'BSzG62Khqw5pbbWPmoe8iZekExekFQBJmjYhiXhcVvtS';

    await app.init();
    // await app.listen(3000);
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(404)
  });

  it('/api/order (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/order')
      .send({
        coin: 'SOL',
        amount: 8,
      })
      .expect(201);
  });
});
