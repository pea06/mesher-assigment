import { QueryTxReceiptByHashUsecase } from '../../../src/application/tx-receipt/query-tx-receipt-by-hash.usecase';
import { mockTxReceiptRepository } from '../../mock/tx-receipt-repository.mock';
import { Test } from '@nestjs/testing';
import { TxLog } from '../../../src/domain/models/tx-log';
import { TxReceipt } from '../../../src/domain/models/tx-receipt';
import { TxReceiptResponse } from '../../../src/application/tx-receipt/dtos/tx-receipt.response';

describe('QueryTxReceiptUsecase', () => {
  let usecase: QueryTxReceiptByHashUsecase
  const txReceiptRepository = mockTxReceiptRepository();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: QueryTxReceiptByHashUsecase,
          useFactory: () => new QueryTxReceiptByHashUsecase(txReceiptRepository,),
        },
      ],
    }).compile();

    usecase = module.get<QueryTxReceiptByHashUsecase>(QueryTxReceiptByHashUsecase);
  })

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should return TxReceiptResponse when tx receipt is found', async () => {
    const txHash = 'txHash1';
    const txLog = new TxLog(0, txHash, 'logData1', null);
    const txReceipt = new TxReceipt(
      '0xRecipientAddress',
      '0xSenderAddress',
      txHash,
      1,
      '10000',
      '0xContractAddress',
      null
    );

    txReceipt.logs = [txLog];
    txLog.transactionReceipt = txReceipt;

    txReceiptRepository.findByTransactionHash.mockResolvedValue(txReceipt);

    const result = await usecase.execute(txHash)

    expect(result).toBeInstanceOf(TxReceiptResponse);
    expect(result.transactionHash).toBe(txHash);
  })
})