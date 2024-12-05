import { Printer } from "./printer";
import { User } from "./user"
import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: 'PrintingLogs' })
export class PrintingLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    // @ManyToOne(() => User, user => user.id)
    // @JoinColumn({ name: 'user' })
    user: string;

    @Column()
    date: Date = new Date();

    @Column()
    fileName: string = "";

    @Column()
    fileType: string = "";
    
    @Column()
    numberOfPage: number = 0;

    @Column()
    // @ManyToOne(() => Printer, printer => printer.id)
    // @JoinColumn({ name: 'printer' })
    printer: string;

    @Column()
    status: 'Completed' | 'Pending' | 'Rejected' = 'Pending'
}