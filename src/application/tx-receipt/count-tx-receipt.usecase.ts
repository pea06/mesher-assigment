import { TxReceiptRepository } from '../../domain/repositories/tx-receipt.repository';

export class CountTxReceiptUseCase {
  constructor(private readonly txReceiptRepository: TxReceiptRepository) {}

  async execute(): Promise<number> {
    return this.txReceiptRepository.count();
  }
}