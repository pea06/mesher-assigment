import { MockRepository } from './types';
import { TxReceiptRepository } from '../../src/domain/repositories/tx-receipt.repository';

export const mockTxReceiptRepository = (): MockRepository<TxReceiptRepository> => ({
  saveTxReceipts: jest.fn(),
  saveTxReceipt: jest.fn(),
  findByTransactionHash: jest.fn(),
  findByFromOrTo: jest.fn(),
  count: jest.fn()
})