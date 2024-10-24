import { MockRepository } from './types';
import { BlockRepository } from '../../src/domain/repositories/block.repository';

export const mockBlockRepository = (): MockRepository<BlockRepository> => ({
  getLastedBlock: jest.fn(),
  findBlockByHash: jest.fn(),
  saveBlock: jest.fn(),
  count: jest.fn(),
});