import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiConfig } from 'solpay-api/dist';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const appService = await app.get(AppService);

  const apiConfig = await app.get(ApiConfig);
  apiConfig.setSolanaCluster('devnet');
  apiConfig.commitment = 'confirmed';
  apiConfig.account = 'BSzG62Khqw5pbbWPmoe8iZekExekFQBJmjYhiXhcVvtS';
  apiConfig.timeout = 120_000;
  apiConfig.addOrderPaidEventListener(appService.orderListener);
  console.log(apiConfig);

  await app.listen(process.env.PORT ?? 8080);
}

bootstrap();

process.setUncaughtExceptionCaptureCallback((err) => {
  console.log('Error:', err.message);
  console.error(err);
});