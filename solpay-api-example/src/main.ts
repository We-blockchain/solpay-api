import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiConfig } from 'solpay-api/dist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const apiConfig = await app.get(ApiConfig);
  apiConfig.setSolanaCluster('devnet');
  apiConfig.account = 'BSzG62Khqw5pbbWPmoe8iZekExekFQBJmjYhiXhcVvtS';
  console.log(apiConfig);

  await app.listen(process.env.PORT ?? 8080);
}

bootstrap();

process.setUncaughtExceptionCaptureCallback((err) => {
  console.log('Error:', err.message);
});