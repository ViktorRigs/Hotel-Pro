import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('roles')
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'description' })
    description: string;

    @CreateDateColumn({ name: 'created_at_19118036' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at_19118036' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at_19118036' })
    deletedAt: Date;
}
