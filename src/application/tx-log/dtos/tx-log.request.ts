import { ApiProperty } from '@nestjs/swagger';

export class TxLogRequest {
  @ApiProperty()
  logIndex: number;

  @ApiProperty()
  transactionHash: string;

  @ApiProperty()
  data: string;

  constructor(logIndex: number, transactionHash: string, data: string) {
    this.logIndex = logIndex;
    this.transactionHash = transactionHash;
    this.data = data;
  }
}