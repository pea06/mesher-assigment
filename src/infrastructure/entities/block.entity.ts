import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TxReceiptEntity } from "./tx-receipt.entity";

@Entity('block')
export class BlockEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'block_number', unique: true })
    blockNumber: number;

    @Column()
    timestamp: number;

    @Column({ name: 'hash', unique: true })
    hash: string;

    @Column({ name: 'miner' })
    miner: string;

    @Column({ name: 'gas_limit' })
    gasLimit: string;

    @Column({ name: 'gas_used' })
    gasUsed: string;

    @OneToMany(() => TxReceiptEntity, transactionReceipt => transactionReceipt.block)
    transactionReceipts: TxReceiptEntity[];

    constructor(
      blockNumber: number,
      timestamp: number,
      hash: string,
      miner: string,
      gasLimit: string,
      gasUsed: string,
    ) {
        this.blockNumber = blockNumber;
        this.timestamp = timestamp;
        this.hash = hash;
        this.miner = miner;
        this.gasLimit = gasLimit;
        this.gasUsed = gasUsed;
    }
}