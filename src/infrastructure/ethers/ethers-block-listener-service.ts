import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { EthersService } from './ethers.service';
import { SaveBlockWithTxUseCase } from '../../application/block/save-block-with-tx.usecase';
import { Block, TransactionReceipt } from 'ethers';
import { BlockRequest } from '../../application/block/dtos/block.request';
import { TxReceiptRequest } from '../../application/tx-receipt/dtos/tx-receipt.request';
import { TxLogRequest } from '../../application/tx-log/dtos/tx-log.request';

@Injectable()
export class EthersBlockListenerService implements OnApplicationBootstrap {
  constructor(
    private readonly ethersService: EthersService,
    private readonly saveBlockWithTxUseCase: SaveBlockWithTxUseCase,
  ) {}

  onApplicationBootstrap() {
    this.ethersService.on('block', async (blockNumber: number) => {
      const block: Block = await this.ethersService.getBlock(blockNumber);
      const transactionReceipts: TransactionReceipt[] = await Promise.all(
        block.transactions.map((txHash) =>
          this.ethersService.getTransactionReceipt(txHash),
        ),
      );

      await this.saveBlockWithTxUseCase.execute(
        new BlockRequest(
          block.number,
          block.timestamp,
          block.hash,
          block.miner,
          block.gasLimit.toString(),
          block.gasUsed.toString(),
          transactionReceipts.map(
            (it) =>
              new TxReceiptRequest(
                it.to,
                it.from,
                it.hash,
                it.status,
                it.gasUsed.toString(),
                it.contractAddress,
                it.logs.map(
                  (it) =>
                    new TxLogRequest(it.index, it.transactionHash, it.data),
                ),
              ),
          ),
        ),
      );
    });
  }
}