import { Block } from './block';
import { TxLog } from './tx-log';

export class TxReceipt {
  id: number;
  to: string;
  from: string;
  transactionHash: string;
  status: number;
  gasUsed: string;
  contractAddress: string;
  block: Block;
  logs: TxLog[]


  constructor(to: string, from: string, transactionHash: string, status: number, gasUsed: string, contractAddress: string, block: Block) {
    this.to = to;
    this.from = from;
    this.transactionHash = transactionHash;
    this.status = status;
    this.gasUsed = gasUsed;
    this.contractAddress = contractAddress;
    this.block = block;
  }
}