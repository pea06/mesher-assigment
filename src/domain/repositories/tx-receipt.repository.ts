import { TxReceipt } from '../models/tx-receipt';

export interface TxReceiptRepository {
    saveTxReceipts(txRecepits: TxReceipt[]);
    saveTxReceipt(txReceipt: TxReceipt): Promise<TxReceipt>;
    findByTransactionHash(transactionHash: string): Promise<TxReceipt>
    findByFromOrTo(from?: string, to?: string): Promise<TxReceipt[]>
    count(): Promise<number>
}