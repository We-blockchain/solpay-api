import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from './api.controller';
import { createOrder, getSolanaPayURL, orderPaid } from 'solpay';
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
      timeout: this.apiConfig.timeout,
      commitment: this.apiConfig.commitment as any,
    });
    this.handleOrder(order);
    return order;
  }

  async handleOrder(order: Order) {
    const parsedTransactionWithMeta = await orderPaid(order);
    this.apiConfig.listeners.forEach(listener => {
      if (parsedTransactionWithMeta) {
        let signature = parsedTransactionWithMeta.transaction.signatures[0];
        listener(order, signature);
      } else {
        listener(order, null);
      }
    });
  }

  async getSolanaPayURL(order: Order): Promise<string> {
    return getSolanaPayURL(order);
  }
}
