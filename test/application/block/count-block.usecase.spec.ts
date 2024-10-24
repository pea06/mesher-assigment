import { CountBlockUseCase } from '../../../src/application/block/count-block.usecase';
import { mockBlockRepository } from '../../mock/block.repository.mock';
import { Test } from '@nestjs/testing';

describe('CountBlockUseCase', () => {
  let usecase: CountBlockUseCase;
  const blockRepository = mockBlockRepository();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: CountBlockUseCase,
          useFactory: () => new CountBlockUseCase(blockRepository,),
        },
      ],
    }).compile();

    usecase = module.get<CountBlockUseCase>(CountBlockUseCase);
  })

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should return block count', async () => {
    const mockCount = 5;
    blockRepository.count.mockResolvedValue(mockCount);

    const result = await usecase.execute();

    expect(result).toBe(mockCount);
    expect(blockRepository.count).toHaveBeenCalled();
  });

})