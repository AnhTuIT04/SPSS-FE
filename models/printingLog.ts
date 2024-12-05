import { Printer } from "./printer";
import { User } from "./user"
import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: 'PrintingLogs' })
export class PrintingLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'studentId' })
    user: User;

    @Column()
    date: Date = new Date();

    @Column()
    fileName: string = "";

    @Column()
    fileType: string = "";
    
    @Column()
    numberOfPage: number = 0;

    @ManyToOne(() => Printer, printer => printer.id)
    @JoinColumn({ name: 'printerId' })
    printer: Printer;

    @Column()
    status: 'Completed' | 'Pending' | 'Rejected' = 'Pending'
}