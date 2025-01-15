import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from './api.controller';
import { createOrder, getSolanaPayURL } from 'solpay';
import { ApiConfig } from './api.config';
import { Order } from 'solpay/lib/type';

@Injectable()
export class ApiService {
  constructor(
    private readonly apiConfig: ApiConfig,
  ) { }

  async createOrder(dto: CreateOrderDTO): Promise<Order> {
    let order = await createOrder({
      pay_to: this.apiConfig.account,
      coin_type: dto.coin,
      coin_amount: dto.amount,
      timeout: 60_000,
    });
    return order;
  }

  async getSolanaPayURL(order: Order): Promise<string> {
    return getSolanaPayURL(order);
  }
}
