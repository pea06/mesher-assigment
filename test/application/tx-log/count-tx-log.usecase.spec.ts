import { CountTxLogUseCase } from '../../../src/application/tx-log/count-tx-log.usecase';
import { mockTxLogRepository } from '../../mock/tx-log.repository.mock';
import { Test } from '@nestjs/testing';

describe('CountTxLogUsecase', () => {
  let usecase: CountTxLogUseCase;
  const txLogRepository = mockTxLogRepository()

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: CountTxLogUseCase,
          useFactory: () => new CountTxLogUseCase(txLogRepository,),
        },
      ],
    }).compile();

    usecase = module.get<CountTxLogUseCase>(CountTxLogUseCase);
  })

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should return tx log count', async () => {
    const mockCount = 5;
    txLogRepository.count.mockResolvedValue(mockCount);

    const result = await usecase.execute();

    expect(result).toBe(mockCount);
    expect(txLogRepository.count).toHaveBeenCalled();
  });

})