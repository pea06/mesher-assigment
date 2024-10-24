import { Cron, CronExpression } from '@nestjs/schedule';
import { Inject, Injectable } from '@nestjs/common';
import { CountTxReceiptUseCase } from '../application/tx-receipt/count-tx-receipt.usecase';
import { CountBlockUseCase } from '../application/block/count-block.usecase';
import { CountTxLogUseCase } from '../application/tx-log/count-tx-log.usecase';
import { SlackService } from '../infrastructure/slack/slack.service';

@Injectable()
export class EthersScheduler {
  constructor(
    private readonly slackService: SlackService,
    @Inject(CountBlockUseCase)
    private readonly countBlockUseCase: CountBlockUseCase,
    @Inject(CountTxReceiptUseCase)
    private readonly countTxReceiptUseCase: CountTxReceiptUseCase,
    @Inject(CountTxLogUseCase)
    private readonly countTxLogUseCase: CountTxLogUseCase,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async notificationBlockCount() {
    const blockCount = await this.countBlockUseCase.execute();
    const txReceiptCount = await this.countTxReceiptUseCase.execute();
    const TxLogCount = await this.countTxLogUseCase.execute();

    const message =
      `Block, TransactionReceipt, Log의 개수 공지 \n` +
      "```" +
      `Block 개수: ${blockCount}\n` +
      `TransactionReceipt 개수: ${txReceiptCount}\n` +
      `Log 개수: ${TxLogCount}\n` +
      "```";

    await this.slackService.sendNotification(message);
  }


}