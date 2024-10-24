import { TxReceipt } from './tx-receipt';

export class Block {
  id: number;
  blockNumber: number;
  timestamp: number;
  hash: string;
  miner: string;
  gasLimit: string;
  gasUsed: string;
  transactionReceipts: TxReceipt[];

  constructor(blockNumber: number, timestamp: number, hash: string, miner: string, gasLimit: string, gasUsed: string, transactionReceipts?: TxReceipt[]) {
    this.blockNumber = blockNumber;
    this.timestamp = timestamp;
    this.hash = hash;
    this.miner = miner;
    this.gasLimit = gasLimit;
    this.gasUsed = gasUsed;
    this.transactionReceipts = transactionReceipts;
  }
}