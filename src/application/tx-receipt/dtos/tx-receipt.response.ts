import { TxLogResponse } from '../../tx-log/dtos/tx-log.response';
import { ApiProperty } from '@nestjs/swagger';
import { TxReceipt } from '../../../domain/models/tx-receipt';

export class TxReceiptResponse {
  @ApiProperty()
  to: string | null = '';

  @ApiProperty()
  from: string;

  @ApiProperty()
  transactionHash: string;

  @ApiProperty()
  status: number;

  @ApiProperty()
  gasUsed: string;

  @ApiProperty()
  contractAddress: string;

  @ApiProperty({ type: [TxLogResponse], isArray: true })
  logs: TxLogResponse[];

  constructor(txReceipt: TxReceipt) {
    this.to = txReceipt.to;
    this.from = txReceipt.from;
    this.transactionHash = txReceipt.transactionHash;
    this.status = txReceipt.status;
    this.gasUsed = txReceipt.gasUsed;
    this.contractAddress = txReceipt.contractAddress;
    this.logs = txReceipt.logs.map(
      log => new TxLogResponse(log)
    );
  }
}