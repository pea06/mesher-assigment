import { Injectable } from '@nestjs/common';
import { TxLogRepository } from '../../domain/repositories/tx-log.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TxLogEntity } from '../entities/tx-log.entity';

@Injectable()
export class TxLogRepositoryImpl implements TxLogRepository {
  constructor(
    @InjectRepository(TxLogEntity)
    private readonly txLogRepository: Repository<TxLogEntity>,
  ) {}

  count(): Promise<number> {
    return this.txLogRepository.count();
  }

  async saveTxLogs(txLogs: TxLogEntity[]) {
    this.txLogRepository.insert(txLogs)
  }
}