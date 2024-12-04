import 'reflect-metadata';
import { Entity, PrimaryColumn, OneToOne, JoinColumn, Column } from 'typeorm';

import { User } from './user';
import { Col } from 'antd';

@Entity({ name: 'students' })
export class Student {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    studentId: string = '';

    @Column()
    class: string = '';

    @Column()
    faculty: string = '';

    @Column()
    pages: number = 0;

    @OneToOne(() => User, user => user.id)
    @JoinColumn({ name: 'id' })
    user: User;
}