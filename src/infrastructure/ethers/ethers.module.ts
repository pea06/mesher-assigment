import { EnvironmentConfigModule } from '../config/environment-config.module';
import { Module } from '@nestjs/common';
import { EthersService } from './ethers.service';
import { EthersBlockListenerService } from './ethers-block-listener-service';
import { ConfigModule } from '@nestjs/config';
import { UsecasesProxyDynamicModule } from '../usecase-proxy/usecase-proxy.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    ConfigModule,
    UsecasesProxyDynamicModule.register(),
  ],
  providers: [EthersService, EthersBlockListenerService],
  exports: [EthersService],
})
export class EthersModule {}