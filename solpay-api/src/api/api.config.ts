import { Injectable } from '@nestjs/common';
import { setCluster } from 'solpay';

type Cluster = 'devnet' | 'testnet' | 'mainnet-beta';

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

  setSolanaCluster(cluster?: Cluster | null, customEndpoint?: string) {
    setCluster(cluster, customEndpoint);
  }
}
