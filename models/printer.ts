import { Col } from "antd";
import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'Printers' })
export class Printer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    image: string = "";

    @Column()
    name: string = "";

    @Column({type: 'json'})
    fileType: string[] = ["pdf", "docx", "xlsx", "pptx", "jpg", "png", "jpeg"];

    @Column()
    location: string = "";

    @Column({type: 'json'})
    pageSize: string[] = ["A4", "A3"];

    @Column()
    status: boolean = true;
}
