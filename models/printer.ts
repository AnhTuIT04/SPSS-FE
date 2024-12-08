import { Col } from "antd";
import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'Printers' })
export class Printer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    image: string = 'https://files.edgestore.dev/m9qevt33wkdo0rzg/publicFiles/_public/adc9b825-f911-464a-ae07-fd15a9bcffae.png'

    @Column()
    name: string = "";

    @Column({ type: 'json' })
    fileType: string[] = ["pdf", "docx", "xlsx", "pptx", "jpg", "png", "jpeg"];

    @Column()
    location: string = "";

    @Column({ type: 'json' })
    pageSize: string[] = ["A2", "A3", "A4", "A5"];

    @Column()
    status: boolean = true;
}
