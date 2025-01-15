import { Body, Controller, Post } from '@nestjs/common';
import { ApiService } from './api.service';
import { Order } from 'solpay/lib/type';

export interface CreateOrderDTO {
  coin: 'SOL' | 'USDT' | 'USDC',
  amount: number,
}

export interface CreateOrderResponse {
  order: Order,
  url: string,
}

@Controller("/api")
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post("/order")
  async createOrder(@Body() dto: CreateOrderDTO): Promise<CreateOrderResponse> {
    const order = await this.apiService.createOrder(dto);
    const url = await this.apiService.getSolanaPayURL(order);
    return {
      order,
      url,
    };
  }
}
