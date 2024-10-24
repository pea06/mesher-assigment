import { MockRepository } from './types';
import { TxLogRepository } from '../../src/domain/repositories/tx-log.repository';

export const mockTxLogRepository = (): MockRepository<TxLogRepository> => ({
  saveTxLogs: jest.fn(),
  count: jest.fn(),
});