import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BlockController } from '../../presentation/block/block.controller';
import { TxReceiptController } from '../../presentation/tx-receipt/tx-receipt.controller';
import { UsecasesProxyDynamicModule } from '../usecase-proxy/usecase-proxy.module';
import { HealthCheckController } from '../../presentation/health-check.controller';

@Module({
  imports: [
    ConfigModule,
    UsecasesProxyDynamicModule.register(),
  ],
  controllers: [ BlockController, TxReceiptController, HealthCheckController ],
})
export class ControllersModule {}