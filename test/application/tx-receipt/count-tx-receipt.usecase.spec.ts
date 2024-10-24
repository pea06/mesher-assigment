import { CountTxReceiptUseCase } from '../../../src/application/tx-receipt/count-tx-receipt.usecase';
import { mockTxReceiptRepository } from '../../mock/tx-receipt-repository.mock';
import { Test } from '@nestjs/testing';

describe('CountTxReceiptUseCase', () => {
  let usecase: CountTxReceiptUseCase;
  const txReceiptRepository = mockTxReceiptRepository();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: CountTxReceiptUseCase,
          useFactory: () => new CountTxReceiptUseCase(txReceiptRepository,),
        },
      ],
    }).compile();

    usecase = module.get<CountTxReceiptUseCase>(CountTxReceiptUseCase);
  })

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should return tx receipt count', async () => {
    const mockCount = 5;
    txReceiptRepository.count.mockResolvedValue(mockCount);

    const result = await usecase.execute();

    expect(result).toBe(mockCount);
    expect(txReceiptRepository.count).toHaveBeenCalled();
  });
})