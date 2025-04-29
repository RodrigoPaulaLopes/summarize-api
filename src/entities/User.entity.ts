import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Summarize } from "./Summarize.entity";



@Entity('user')
class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    first_name: string;
    @Column({ type: 'varchar', length: 100, nullable: true })
    last_name: string;

    @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;

    @OneToMany(() => Summarize, (summarize) => summarize.user)
    summarizes: Summarize[]

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

}

export default User;