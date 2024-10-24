import { TxLogRepository } from '../../domain/repositories/tx-log.repository';

export class CountTxLogUseCase {
  constructor(private readonly txLogRepository: TxLogRepository) {}

  async execute(): Promise<number> {
    return this.txLogRepository.count();
  }
}