import { TxReceiptRepository } from '../../domain/repositories/tx-receipt.repository';
import { TxReceiptResponse } from './dtos/tx-receipt.response';
import { TxReceiptDoesNotExistException } from './exceptions/tx-receipt-does-not-exist.exception';

export class QueryTxReceiptByHashUsecase {
  constructor(private readonly txReceiptRepository: TxReceiptRepository) {}

  async execute(txHash: string) {
    const txReceipt = await this.txReceiptRepository.findByTransactionHash(txHash)
    if (!txReceipt) {
      throw new TxReceiptDoesNotExistException(txHash)
    }
    return new TxReceiptResponse(txReceipt)
  }
}