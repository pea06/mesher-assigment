import { TxLogRepository } from '../../domain/repositories/tx-log.repository';
import { TxReceiptRepository } from '../../domain/repositories/tx-receipt.repository';
import { BlockRepository } from '../../domain/repositories/block.repository';
import { BlockRequest } from './dtos/block.request';
import { Block } from '../../domain/models/block';
import { TxReceipt } from '../../domain/models/tx-receipt';
import { TxLog } from '../../domain/models/tx-log';

export class SaveBlockWithTxUseCase {
  constructor(
    private readonly blockRepository: BlockRepository,
    private readonly txReceiptRepository: TxReceiptRepository,
    private readonly txLogRepository: TxLogRepository,
  ) {}

  async execute(blockRequest: BlockRequest): Promise<void> {
    const savedBlock = await this.blockRepository.saveBlock(
      new Block(
        blockRequest.blockNumber,
        blockRequest.timestamp,
        blockRequest.hash,
        blockRequest.miner,
        blockRequest.gasLimit,
        blockRequest.gasUsed,
      )
    );

    for (const txReceipt of blockRequest.transactionReceipts) {
      const savedReceipt = await this.txReceiptRepository.saveTxReceipt(
        new TxReceipt(
          txReceipt.to,
          txReceipt.from,
          txReceipt.transactionHash,
          txReceipt.status,
          txReceipt.gasUsed,
          txReceipt.contractAddress,
          savedBlock
        )
      );

      const logs: TxLog[] = []
      for (const logDto of txReceipt.logs) {
        logs.push(
          new TxLog(
            logDto.logIndex,
            logDto.transactionHash,
            logDto.data,
            savedReceipt
          )
        )
        await this.txLogRepository.saveTxLogs(logs);
      }
    }
  }
}