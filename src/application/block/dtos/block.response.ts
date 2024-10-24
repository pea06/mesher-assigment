import { TxReceiptResponse } from '../../tx-receipt/dtos/tx-receipt.response';
import { ApiProperty } from '@nestjs/swagger';
import { Block } from '../../../domain/models/block';

export class BlockResponse {
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
  transactionReceipts: TxReceiptResponse[];

  constructor(block: Block) {
    this.blockNumber = block.blockNumber;
    this.timestamp = block.timestamp;
    this.hash = block.hash;
    this.miner = block.miner;
    this.gasLimit = block.gasLimit;
    this.gasUsed = block.gasUsed;
    this.transactionReceipts = block.transactionReceipts.map(
      transaction => new TxReceiptResponse(transaction)
    );
  }
}