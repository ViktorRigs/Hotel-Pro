import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { RoleEntity } from './role.entity';
import { BookingsEntity } from './bookings.entity';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true })
    token: string;

    @OneToMany(() => BookingsEntity, (booking) => booking.userId)
    bookings: BookingsEntity[];


    @ManyToOne(() => RoleEntity)
    @JoinColumn({ name: 'role' })
    role: RoleEntity;

    @CreateDateColumn({ name: 'created_at_19118036' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at_19118036' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at_19118036' })
    deletedAt: Date;
}
