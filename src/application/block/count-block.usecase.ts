import { BlockRepository } from '../../domain/repositories/block.repository';

export class CountBlockUseCase {
  constructor(private readonly blockRepository: BlockRepository) {}

  async execute(): Promise<number> {
    return this.blockRepository.count();
  }
}