import { IncomingWebhook } from '@slack/webhook';
import { EnvironmentConfigService } from '../config/environment-config.service';
import { Inject } from '@nestjs/common';
import { SlackConfig } from '../../domain/config/slack.config';

export class SlackService {
  private webhook: IncomingWebhook;

  constructor(
    @Inject(EnvironmentConfigService)
    private configService: SlackConfig,
  ) {
    this.webhook = new IncomingWebhook(
      this.configService.getWebHookUrl()
    );
  }

  async sendNotification(message: string) {
    await this.webhook.send(message)
  }
}