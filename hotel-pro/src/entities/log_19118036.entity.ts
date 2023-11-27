import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('log_19118036')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'table_name', default: null })
    tableName: string;

    @Column({ name: 'operation_type', default: 'Update', nullable: true })
    operationType: string;

    @CreateDateColumn({ name: 'operation_date_19118036' })
    createdAt: Date;
}