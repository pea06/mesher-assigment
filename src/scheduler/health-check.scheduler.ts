import {Injectable} from "@nestjs/common";
import { Cron, CronExpression } from '@nestjs/schedule';
import { SlackService } from '../infrastructure/slack/slack.service';
import { HealthCheckService, HttpHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Injectable()
export class HealthCheckScheduler {
  constructor(
    private readonly slackService: SlackService,
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
    private readonly http: HttpHealthIndicator,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async notificationServerHealth() {
    const dbCheck = await this.health.check([() => this.db.pingCheck('masher-assigment')]);
    const httpCheck = await this.health.check([() => this.http.pingCheck('http', 'health')]);

    const message =
      `서버상태 공지 \n` +
      "```" +
      `HTTP Service: ${httpCheck.status === 'ok' ? '✅ OK' : '❌ DOWN'}\n` +
      `Database: ${dbCheck.status === 'ok' ? '✅ OK' : '❌ DOWN'}\n` +
      "```";

    await this.slackService.sendNotification(message);
  }
}