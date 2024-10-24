import { ApiProperty } from '@nestjs/swagger';
import { TxReceiptRequest } from '../../tx-receipt/dtos/tx-receipt.request';

export class BlockRequest {
  @ApiProperty()
  blockNumber: number;

  @ApiProperty()
  timestamp: number;

  @ApiProperty()
  hash: string;

  @ApiProperty()
  miner: string;

  @ApiProperty()
  gasLimit: string;

  @ApiProperty()
  gasUsed: string;

  @ApiProperty()
  transactionReceipts: TxReceiptRequest[];

  constructor(blockNumber: number, timestamp: number, hash: string, miner: string, gasLimit: string, gasUsed: string, transactionReceipts: TxReceiptRequest[]) {
    this.blockNumber = blockNumber;
    this.timestamp = timestamp;
    this.hash = hash;
    this.miner = miner;
    this.gasLimit = gasLimit;
    this.gasUsed = gasUsed;
    this.transactionReceipts = transactionReceipts;
  }
}