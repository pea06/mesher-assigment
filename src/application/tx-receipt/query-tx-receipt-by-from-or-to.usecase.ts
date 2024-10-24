import { TxReceiptRepository } from '../../domain/repositories/tx-receipt.repository';
import { TxReceiptResponse } from './dtos/tx-receipt.response';

export class QueryTxReceiptByFromOrToUsecase {
  constructor(private readonly txReceiptRepository: TxReceiptRepository) {}

  async execute(from?: string, to?: string): Promise<TxReceiptResponse[]> {
    const receipts = await this.txReceiptRepository.findByFromOrTo(from, to)
    return receipts.map(receipt => new TxReceiptResponse(receipt));
  }
}