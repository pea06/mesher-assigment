import { TxReceipt } from './tx-receipt';

export class TxLog {
  id: number;
  logIndex: number;
  transactionHash: string;
  data: string;
  transactionReceipt: TxReceipt;

  constructor(logIndex: number, transactionHash: string, data: string, transactionReceipt: TxReceipt) {
    this.logIndex = logIndex;
    this.transactionHash = transactionHash;
    this.data = data;
    this.transactionReceipt = transactionReceipt;
  }
}