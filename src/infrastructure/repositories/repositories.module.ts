import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockEntity } from '../entities/block.entity';
import { TxLogEntity } from '../entities/tx-log.entity';
import { TxReceiptEntity } from '../entities/tx-receipt.entity';
import { BlockRepositoryImpl } from './block.repository.impl';
import { TxReceiptRepositoryImpl } from './tx-receipt.repository.impl';
import { TxLogRepositoryImpl } from './tx-log.repository.impl';
import { TypeOrmConfigModule } from '../config/typeorm.config';


@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([
      BlockEntity,
      TxReceiptEntity,
      TxLogEntity,
    ])
  ],
  providers: [
    BlockRepositoryImpl,
    TxReceiptRepositoryImpl,
    TxLogRepositoryImpl
  ],
  exports: [
    BlockRepositoryImpl,
    TxReceiptRepositoryImpl,
    TxLogRepositoryImpl
  ]
})
export class RepositoriesModule {}