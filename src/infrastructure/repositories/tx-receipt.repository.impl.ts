import { Injectable } from '@nestjs/common';
import { TxReceiptRepository } from '../../domain/repositories/tx-receipt.repository';
import { TxReceiptEntity } from '../entities/tx-receipt.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TxReceiptRepositoryImpl implements TxReceiptRepository {
  constructor(
    @InjectRepository(TxReceiptEntity)
    private readonly txReceiptEntityRepository: Repository<TxReceiptEntity>,
  ) {}

  count(): Promise<number> {
    return this.txReceiptEntityRepository.count();
  }

  saveTxReceipt(txRecepits: TxReceiptEntity): Promise<TxReceiptEntity> {
    return  this.txReceiptEntityRepository.save(txRecepits);
  }

  saveTxReceipts(txRecepits: TxReceiptEntity[]) {
    this.txReceiptEntityRepository.insert(txRecepits);
  }
  findByTransactionHash(transactionHash: string): Promise<TxReceiptEntity> {
    return this.txReceiptEntityRepository.findOne({
      where: { transactionHash },
      relations: ['logs'],
    });
  }
  findByFromOrTo(from?: string, to?: string): Promise<TxReceiptEntity[]> {
    return this.txReceiptEntityRepository.find({
      where: [from ? { from } : null, to ? { to } : null].filter(Boolean),
      relations: ['logs'],
    });
  }
}