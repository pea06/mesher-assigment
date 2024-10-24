import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { ControllersModule } from './infrastructure/controller/controllers.module';
import { SchedulesModule } from './infrastructure/scheduler/schedules.module';
import { EthersModule } from './infrastructure/ethers/ethers.module';

@Module({
    imports: [RepositoriesModule, ControllersModule, TerminusModule, SchedulesModule, EthersModule],
})
export class AppModule {}
