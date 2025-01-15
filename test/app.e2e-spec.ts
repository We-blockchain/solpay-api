import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/example/app.module';
import { ApiConfig } from './../src/api/api.config';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let apiConfig: ApiConfig;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
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
      .expect(200)
      .expect('Hello World!');
  });

  it('/api (GET)', () => {
    return request(app.getHttpServer())
      .post('/api')
      .send({
        coin: 'SOL',
        amount: 8,
      })
      .expect(201);
  });
});
