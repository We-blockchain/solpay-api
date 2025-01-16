import { Injectable } from '@nestjs/common';
import { setCluster } from 'solpay';
import { Order } from 'solpay/lib/type';

type Cluster = 'devnet' | 'testnet' | 'mainnet-beta';
type Finality = 'confirmed' | 'finalized';

/**
 * If timeout, signature will be null
 */
export type OrderListener = (order: Order, signature: string | null) => void;

/**
 * ```
 * const apiConfig = await app.get(ApiConfig);
 * apiConfig.setSolanaCluster('devnet');
 * apiConfig.account = 'BSzG62Khqw5pbbWPmoe8iZekExekFQBJmjYhiXhcVvtS';
 * ```
 */
@Injectable()
export class ApiConfig {
  /**
   * Recipient address
   */
  account: string = "";
  /**
   * Order paid listeners
   */
  listeners: OrderListener[] = [];
  timeout: number = 120_000;
  commitment: Finality =  'confirmed';

  setSolanaCluster(cluster?: Cluster | null, customEndpoint?: string) {
    setCluster(cluster, customEndpoint);
  }

  addOrderPaidEventListener(listener: OrderListener) {
    this.listeners.push(listener);
  }
}
