import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../config/environment-config.module';
import { SlackService } from './slack.service';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [SlackService],
  exports: [SlackService],
})
export class SlackModule {}