import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { HotelEntity } from './hotel.entity';
import { UserEntity } from './user.entity';

@Entity('bookings')
export class BookingsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    userId: UserEntity;

    @Column({ name: 'customer_name' })
    customerName: string;

    @Column({ name: 'customer_email' })
    customerEmail: string;

    @Column({ name: 'check_in_date' })
    checkInDate: string;

    @ManyToOne(() => UserEntity, (user) => user.bookings)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => HotelEntity, (hotel) => hotel.bookings)
    @JoinColumn({ name: 'hotel_id' })
    hotelId: HotelEntity;

    @Column({ name: 'check_out_date' })
    checkOutDate: string;

    @CreateDateColumn({ name: 'created_at_19118036' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at_19118036' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at_19118036' })
    deletedAt: Date;
}

