import { Injectable } from '@nestjs/common';
import { BlockRepository } from '../../domain/repositories/block.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { BlockEntity } from '../entities/block.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlockRepositoryImpl implements BlockRepository {
  constructor(
    @InjectRepository(BlockEntity)
    private readonly blockRepository: Repository<BlockEntity>,
  ) {}

  async count(): Promise<number> {
    return await this.blockRepository.count();
  }

  findBlockByHash(hash: string): Promise<BlockEntity> {
    return this.blockRepository.findOne({
      where: { hash },
      relations: ['transactionReceipts', 'transactionReceipts.logs'],
    });
  }

  async getLastedBlock(): Promise<BlockEntity> {
    throw new Error('Method not implemented.');
  }

  async saveBlock(block: BlockEntity): Promise<BlockEntity> {
    return this.blockRepository.save(block);
  }
}