import { QueryBlockByHashUsecase } from '../../../src/application/block/query-block-by-hash.usecase';
import { mockBlockRepository } from '../../mock/block.repository.mock';
import { Test } from '@nestjs/testing';
import { BlockResponse } from '../../../src/application/block/dtos/block.response';
import { Block } from '../../../src/domain/models/block'
import { TxReceipt } from '../../../src/domain/models/tx-receipt';
import { TxLog } from '../../../src/domain/models/tx-log';
import { BlockDoesNotExistException } from '../../../src/application/block/exceptions/block-does-not-exist.exception';

describe('QueryBlockByHashUsecase', () => {
  let usecase: QueryBlockByHashUsecase
  const blockRepository = mockBlockRepository()

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: QueryBlockByHashUsecase,
          useFactory: () => new QueryBlockByHashUsecase(blockRepository,),
        },
      ],
    }).compile();

    usecase = module.get<QueryBlockByHashUsecase>(QueryBlockByHashUsecase);
  })

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should return BlockResponse when block is found', async () => {
    // Given
    const blockHash = 'validBlockHash';
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
    txReceipt.logs = [txLog]; // 연결된 로그
    const block: Block = new Block(
      1,
      1729737815,
      blockHash,
      '0xMinerAddress',
      '1000000',
      '800000',
      [txReceipt]
    );
    txReceipt.block = block;
    txLog.transactionReceipt = txReceipt;
    blockRepository.findBlockByHash.mockResolvedValue(block);

    const result = await usecase.execute(blockHash);

    expect(result).toBeInstanceOf(BlockResponse);
    expect(result.blockNumber).toBe(1);
    expect(result.hash).toBe(blockHash);
    expect(result.transactionReceipts.length).toBe(1);

    const receipt = result.transactionReceipts[0];
    expect(receipt.to).toBe('0xRecipientAddress');
    expect(receipt.from).toBe('0xSenderAddress');
    expect(receipt.logs.length).toBe(1);

    const log = receipt.logs[0];
    expect(log.transactionHash).toBe('txHash1');
    expect(log.data).toBe('logData1');

    // Then
    expect(result).toEqual(new BlockResponse(block));
    expect(blockRepository.findBlockByHash).toHaveBeenCalledWith(blockHash);
  });

  it('should throw BlockDoesNotExistException when block is not found', async () => {
    // Given
    const blockHash = 'invalidBlockHash';
    blockRepository.findBlockByHash.mockResolvedValue(null);

    // When / Then
    await expect(usecase.execute(blockHash)).rejects.toThrow(BlockDoesNotExistException);
    expect(blockRepository.findBlockByHash).toHaveBeenCalledWith(blockHash);
  });
})
