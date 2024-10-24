import { Injectable } from '@nestjs/common';
import { DatabaseConfig } from '../../domain/config/database.interface';
import { ConfigService } from '@nestjs/config';
import { EthersConfig } from '../../domain/config/ethers.config';
import { SlackConfig } from '../../domain/config/slack.config';

@Injectable()
export class EnvironmentConfigService
  implements DatabaseConfig, EthersConfig, SlackConfig
{
  constructor(private readonly configService: ConfigService) {}

  getWebHookUrl(): string {
    return this.configService.get<string>('SLACK_WEBHOOK_URL');
  }

  getNetWork(): string {
    return this.configService.get<string>('ETHERS_NETWORK');
  }
  getInfuraApiKey(): string {
    return this.configService.get<string>('INFURA_API_KEY');
  }

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }
  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }
  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER');
  }
  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }
  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }
  getDatabaseSync(): boolean {
    return this.configService.get<boolean>('DATABASE_SYNC');
  }
}