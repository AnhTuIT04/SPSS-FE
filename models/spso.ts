import 'reflect-metadata';
import { Entity, PrimaryColumn, OneToOne, JoinColumn, Column } from 'typeorm';

import { User } from './user';

@Entity({ name: 'spso' })
export class Spso {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    // @OneToOne(() => User, user => user.id)
    // @JoinColumn({ name: 'id' })
    user: string;
}