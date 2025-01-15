import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ApiConfig } from './api.config';

@Module({
  imports: [],
  controllers: [ApiController],
  providers: [ApiService, ApiConfig],
  exports: [ApiConfig],
})
export class ApiModule {}
