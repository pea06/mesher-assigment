import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { TxReceiptEntity } from "./tx-receipt.entity";

@Entity('transaction_log')
export class TxLogEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'log_index' })
    logIndex: number;

    @Column({ name: 'transaction_hash' })
    transactionHash: string;

    @Column({ name: 'data' })
    data: string;

    @ManyToOne(() => TxReceiptEntity, transactionReceipt => transactionReceipt.logs)
    @JoinColumn({ name: 'transaction_receipt_id' })
    transactionReceipt: TxReceiptEntity;

    constructor(
      logIndex: number,
      transactionHash: string,
      data: string,
      transactionReceipt: TxReceiptEntity
    ) {
        this.logIndex = logIndex;
        this.transactionHash = transactionHash;
        this.data = data;
        this.transactionReceipt = transactionReceipt;
    }
}