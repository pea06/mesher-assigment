import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {TxLogEntity} from "./tx-log.entity";
import {BlockEntity} from "./block.entity";

@Entity('transaction_receipt')
export class TxReceiptEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'to', nullable: true })
    to: string;

    @Column({ name: 'from' })
    from: string;

    @Column({ name: 'transaction_hash', unique: true })
    transactionHash: string;

    @Column({ name: 'status', nullable: true })
    status: number;

    @Column({type: 'bigint'})
    gasUsed: string;

    @Column({ name: 'contract_address', nullable: true })
    contractAddress: string;

    @ManyToOne(() => BlockEntity, block => block.transactionReceipts)
    @JoinColumn({ name: 'block_id' })
    block: BlockEntity;

    @OneToMany(() => TxLogEntity, log => log.transactionReceipt)
    logs: TxLogEntity[];

    constructor(
      to: string,
      from: string,
      transactionHash: string,
      status: number,
      gasUsed: string,
      contractAddress: string,
      block: BlockEntity,
    ) {
        this.to = to;
        this.from = from;
        this.transactionHash = transactionHash;
        this.status = status;
        this.gasUsed = gasUsed;
        this.contractAddress = contractAddress;
        this.block = block;
    }
}
