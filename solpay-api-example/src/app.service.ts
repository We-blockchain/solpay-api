import { Injectable } from '@nestjs/common';
import { OrderListener } from 'solpay-api/dist';

@Injectable()
export class AppService {
  private orderResultMap = new Map<string, string>;
  private orderAwaitMap = new Map<string, [(value: string | PromiseLike<string>) => void, reject: (reason?: any) => void]>();

  orderListener: OrderListener = (order, signature) => {
    let orderId = order.id;
    if (signature) {
      console.log(`Order ${orderId} Paid: ${signature}`);
      console.log(`Order ref: ${order.info.ref}`);
    } else {
      console.log(`Order ${orderId} Timeout`);
    }

    this.orderResultMap.set(orderId, signature);

    let promise = this.orderAwaitMap.get(orderId);
    if (promise) {
      let [resolve, reject] = promise;
      resolve(signature);
    }
  }

  getHello(): string {
    return 'Hello World!';
  }

  awaitOrderResult(orderId: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      let result = this.orderResultMap.get(orderId);
      if (result !== undefined) {
        resolve(result);
      } else {
        this.orderAwaitMap.set(orderId, [resolve, reject]);
      }
    });
  }
}
