import { DynamicModule, Module } from '@nestjs/common';
import { RepositoriesModule } from '../repositories/repositories.module';
import { BlockRepositoryImpl } from '../repositories/block.repository.impl';
import { QueryBlockByHashUsecase } from '../../application/block/query-block-by-hash.usecase';
import { TxReceiptRepositoryImpl } from '../repositories/tx-receipt.repository.impl';
import { QueryTxReceiptByHashUsecase } from '../../application/tx-receipt/query-tx-receipt-by-hash.usecase';
import { QueryTxReceiptByFromOrToUsecase } from '../../application/tx-receipt/query-tx-receipt-by-from-or-to.usecase';
import { TxLogRepositoryImpl } from '../repositories/tx-log.repository.impl';
import { CountBlockUseCase } from '../../application/block/count-block.usecase';
import { BlockRepository } from '../../domain/repositories/block.repository';
import { CountTxReceiptUseCase } from '../../application/tx-receipt/count-tx-receipt.usecase';
import { CountTxLogUseCase } from '../../application/tx-log/count-tx-log.usecase';
import { SaveBlockWithTxUseCase } from '../../application/block/save-block-with-tx.usecase';
import { TxReceiptRepository } from '../../domain/repositories/tx-receipt.repository';
import { TxLogRepository } from '../../domain/repositories/tx-log.repository';

@Module({
  imports: [
    RepositoriesModule
  ]
})
export class UsecasesProxyDynamicModule {
  static register(): DynamicModule {
    return {
      module: UsecasesProxyDynamicModule,
      providers: [
        //block
        {
          inject: [BlockRepositoryImpl],
          provide: QueryBlockByHashUsecase,
          useFactory: (blockRepository: BlockRepositoryImpl) => new QueryBlockByHashUsecase(blockRepository)
        },
        {
          inject: [BlockRepositoryImpl],
          provide: CountBlockUseCase,
          useFactory: (
            blockRepository: BlockRepository,
          )=> new CountBlockUseCase(blockRepository)
        },
        {
          inject: [
            BlockRepositoryImpl, TxReceiptRepositoryImpl, TxLogRepositoryImpl
          ],
          provide: SaveBlockWithTxUseCase,
          useFactory: (
            blockRepository: BlockRepository,
            txReceiptRepository: TxReceiptRepository,
            txLogRepository: TxLogRepository
          )=> new SaveBlockWithTxUseCase(
            blockRepository,
            txReceiptRepository,
            txLogRepository,
          )
        },

        //tx-receipt
        {
          inject: [TxReceiptRepositoryImpl],
          provide: CountTxReceiptUseCase,
          useFactory: (
            txReceiptRepository: TxReceiptRepositoryImpl,
          )=> new CountTxReceiptUseCase(txReceiptRepository)
        },
        {
          inject: [TxReceiptRepositoryImpl],
          provide: QueryTxReceiptByHashUsecase,
          useFactory: (txReceiptRepository: TxReceiptRepositoryImpl)=> new QueryTxReceiptByHashUsecase(txReceiptRepository)
        },
        {
          inject: [TxReceiptRepositoryImpl],
          provide: QueryTxReceiptByFromOrToUsecase,
          useFactory: (txReceiptRepository: TxReceiptRepositoryImpl,)=> new QueryTxReceiptByFromOrToUsecase(txReceiptRepository)
        },

        //tx-log
        {
          inject: [TxLogRepositoryImpl],
          provide: CountTxLogUseCase,
          useFactory: (
            txLogRepository: TxLogRepositoryImpl,
          )=> new CountTxLogUseCase(txLogRepository)
        },
      ],
      exports: [
        SaveBlockWithTxUseCase,
        QueryBlockByHashUsecase,
        QueryTxReceiptByHashUsecase,
        QueryTxReceiptByFromOrToUsecase,
        CountBlockUseCase,
        CountTxReceiptUseCase,
        CountTxLogUseCase
      ]
    }
  }

}