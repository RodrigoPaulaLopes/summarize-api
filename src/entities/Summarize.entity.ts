import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "./User.entity";

@Entity('summarize')
export class Summarize {

    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column()
    title: string
    @Column()
    content: string


    @ManyToOne(() => User, user => user.summarizes)
    user: User

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}