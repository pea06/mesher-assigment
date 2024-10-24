import { BlockRepository } from '../../domain/repositories/block.repository';
import { BlockDoesNotExistException } from './exceptions/block-does-not-exist.exception';
import { BlockResponse } from './dtos/block.response';

export class QueryBlockByHashUsecase {
  constructor(private readonly blockRepository: BlockRepository) {}

  async execute(hash: string): Promise<BlockResponse> {
    const block = await this.blockRepository.findBlockByHash(hash)
    if (!block) throw new BlockDoesNotExistException(hash)
    return new BlockResponse(block)
  }
}