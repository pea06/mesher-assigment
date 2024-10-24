import { TxLog } from '../models/tx-log';

export interface TxLogRepository {
    saveTxLogs(txLogs: TxLog[]);
    count(): Promise<number>;
}