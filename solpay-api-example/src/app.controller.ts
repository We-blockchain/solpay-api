import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/await')
  awaitOrderResult(@Query('orderId') orderId: string): Promise<string | null> {
    console.log('awaitOrderResult:', orderId);
    return this.appService.awaitOrderResult(orderId);
  }
}
