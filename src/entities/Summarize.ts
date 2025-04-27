import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('summarize')
export class Summarize {

    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column()
    title: string
    @Column()
    content: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}