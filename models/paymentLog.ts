import { User } from "./user"
import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: 'PaymentLogs' })
export class PaymentLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'studentId' })
    user: User;

    @Column()
    date: Date;

    @Column()
    numberOfPage: number = 0;

    @Column()
    amount: number = 0;

    @Column()
    status: 'Completed' | 'Pending' | 'Rejected' = 'Pending'
}