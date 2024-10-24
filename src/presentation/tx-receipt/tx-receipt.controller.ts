import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { QueryTxReceiptByHashUsecase } from '../../application/tx-receipt/query-tx-receipt-by-hash.usecase';
import { QueryTxReceiptByFromOrToUsecase } from '../../application/tx-receipt/query-tx-receipt-by-from-or-to.usecase';
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TxReceiptResponse } from '../../application/tx-receipt/dtos/tx-receipt.response';

@Controller('transaction-receipt')
@ApiTags('transaction-receipts')
export class TxReceiptController {
  constructor(
    @Inject(QueryTxReceiptByFromOrToUsecase)
    private readonly getTxReceiptByFromOrToUseCase: QueryTxReceiptByFromOrToUsecase,
    @Inject(QueryTxReceiptByHashUsecase)
    private readonly getTxReceiptByHashUseCase: QueryTxReceiptByHashUsecase
  ) {}

  @Get(':hash')
  @ApiOperation({ summary: 'Transaction hash를 기준으로 TransactionReceipt을 조회합니다.' })
  @ApiParam({ name: 'hash', type: 'string', required: true, description: 'transaction hash' })
  @ApiOkResponse({ type: TxReceiptResponse, description: 'TransactionReceipt, Log를 반환합니다.', })
  async getTransactionReceiptByHash(@Param('hash') hash: string): Promise<TxReceiptResponse> {
    return this.getTxReceiptByHashUseCase.execute(hash);
  }

  @Get()
  @ApiOperation({ summary: 'from 또는 to을 기준으로 TransactionReceipt을 조회합니다.' })
  @ApiQuery({ name: 'from', type: 'string', required: false, description: '송신자의 주소입니다.' })
  @ApiQuery({ name: 'to', type: 'string', required: false, description: '수신자의 주소입니다.' })
  @ApiOkResponse({ type: TxReceiptResponse, description: 'TransactionReceipt, Log를 반환합니다.', })
  async getTransactionReceipts(@Query('from') from?: string, @Query('to') to?: string): Promise<TxReceiptResponse[]> {
    return this.getTxReceiptByFromOrToUseCase.execute(from, to);
  }

}