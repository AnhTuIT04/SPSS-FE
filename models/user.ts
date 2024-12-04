import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string = '';

    @Column()
    lastName: string = '';

    @Column({ unique: true })
    email: string = '';

    @Column()
    gender: boolean = true;

    @Column({ nullable: true })
    address: string = '';

    @Column()
    password: string = '';

    @Column({ unique: true })
    username: string = '';

    @Column()
    image: string = '';

    @Column()
    role: 'spso' | 'student' = 'student';
}