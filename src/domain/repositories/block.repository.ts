import { Block } from '../models/block';

export interface BlockRepository {
    getLastedBlock(): Promise<Block>;

    findBlockByHash(hash: string): Promise<Block>;

    saveBlock(block: Block): Promise<Block>;

    count(): Promise<number>;
}