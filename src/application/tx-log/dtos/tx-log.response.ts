import { ApiProperty } from '@nestjs/swagger';
import { TxLog } from '../../../domain/models/tx-log';

export class TxLogResponse {
  @ApiProperty()
  logIndex: number;

  @ApiProperty()
  transactionHash: string;

  @ApiProperty()
  data: string;

  constructor(txLog: TxLog) {
    this.logIndex = txLog.logIndex;
    this.transactionHash = txLog.transactionHash;
    this.data = txLog.data;
  }
}