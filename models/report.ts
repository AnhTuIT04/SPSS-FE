import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'Reports' })
export class Report {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    link: string = "";

    @Column()
    name: string = "";

    @Column()
    date: Date = new Date();

    @Column()
    type: "Printing" | "Payment" = "Printing";
}