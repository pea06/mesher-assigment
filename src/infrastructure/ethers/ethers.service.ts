import { EnvironmentConfigService } from '../config/environment-config.service';
import { Inject } from '@nestjs/common';
import { Block, InfuraProvider, TransactionReceipt } from 'ethers';
import { EthersConfig } from '../../domain/config/ethers.config';

export class EthersService {
  private infuraProvider: InfuraProvider;

  constructor(
    @Inject(EnvironmentConfigService)
    private configService: EthersConfig,
  ) {
    this.infuraProvider = new InfuraProvider(
      this.configService.getNetWork(),
      this.configService.getInfuraApiKey()
    );
  }

  on(event: string, listener: (blockNumber: number) => void): void {
    this.infuraProvider.on(event, listener);
  }

  async getBlock(blockNumber: number): Promise<Block> {
    return await this.infuraProvider.getBlock(blockNumber);
  }

  async getTransactionReceipt(txHash: string): Promise<TransactionReceipt> {
    return await this.infuraProvider.getTransactionReceipt(txHash);
  }

}