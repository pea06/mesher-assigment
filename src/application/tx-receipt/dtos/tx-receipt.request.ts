import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { TxLogResponse } from '../../tx-log/dtos/tx-log.response';

export class TxReceiptRequest {
  @ApiProperty()
  to: string;

  @ApiProperty()
  from: string;

  @ApiProperty()
  transactionHash: string;

  @ApiProperty()
  status: number;

  @ApiProperty()
  gasUsed: string;

  @Column({ name: 'contract_address', nullable: true })
  contractAddress: string;

  @ApiProperty()
  logs: TxLogResponse[];

  constructor(to: string, from: string, transactionHash: string, status: number, gasUsed: string, contractAddress: string, logs: TxLogResponse[]) {
    this.to = to;
    this.from = from;
    this.transactionHash = transactionHash;
    this.status = status;
    this.gasUsed = gasUsed;
    this.contractAddress = contractAddress;
    this.logs = logs;
  }
}