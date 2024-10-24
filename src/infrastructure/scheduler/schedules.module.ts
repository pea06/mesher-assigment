import { Module } from '@nestjs/common';
import { HealthCheckScheduler } from '../../scheduler/health-check.scheduler';
import { SlackModule } from '../slack/slack.module';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { EthersScheduler } from '../../scheduler/ethers.scheduler';
import { UsecasesProxyDynamicModule } from '../usecase-proxy/usecase-proxy.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SlackModule,
    TerminusModule,
    HttpModule,
    UsecasesProxyDynamicModule.register(),
  ],
  providers: [
    HealthCheckScheduler,
    EthersScheduler,
  ]
})
export class SchedulesModule {}