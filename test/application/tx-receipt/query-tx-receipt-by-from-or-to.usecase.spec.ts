import {
  QueryTxReceiptByFromOrToUsecase
} from '../../../src/application/tx-receipt/query-tx-receipt-by-from-or-to.usecase';
import { mockTxReceiptRepository } from '../../mock/tx-receipt-repository.mock';
import { Test } from '@nestjs/testing';
import { TxLog } from '../../../src/domain/models/tx-log';
import { TxReceipt } from '../../../src/domain/models/tx-receipt';

describe('QueryTxReceiptByFromOrToUsecase', () => {
  let usecase: QueryTxReceiptByFromOrToUsecase;
  const txReceiptRepository = mockTxReceiptRepository();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: QueryTxReceiptByFromOrToUsecase,
          useFactory: () => new QueryTxReceiptByFromOrToUsecase(txReceiptRepository,),
        },
      ],
    }).compile();

    usecase = module.get<QueryTxReceiptByFromOrToUsecase>(QueryTxReceiptByFromOrToUsecase);
  })

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should return TxReceiptResponse when tx receipt is found', async () => {
    const txLog = new TxLog(0, 'txHash1', 'logData1', null);
    const txReceipt = new TxReceipt(
      '0xRecipientAddress',
      '0xSenderAddress',
      'txHash1',
      1,
      '10000',
      '0xContractAddress',
      null
    );

    txReceipt.logs = [txLog];
    txLog.transactionReceipt = txReceipt;

    txReceiptRepository.findByFromOrTo.mockResolvedValue([txReceipt]);

    const result = await usecase.execute()
    const receipt = result[0];
    expect(receipt.to).toBe('0xRecipientAddress');
    expect(receipt.from).toBe('0xSenderAddress');
    expect(receipt.logs.length).toBe(1);

    const log = receipt.logs[0];
    expect(log.transactionHash).toBe('txHash1');
    expect(log.data).toBe('logData1');
  });
})