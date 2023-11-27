import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, UpdateDateColumn, JoinTable, DeleteDateColumn, OneToMany } from 'typeorm';
import { ServicesEntity } from './services.entity';
import { BookingsEntity } from './bookings.entity';

@Entity('hotels')
export class HotelEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'owner_id' })
    ownerId: number;

    @Column({ name: 'address' })
    address: string;

    @Column({ name: 'stars' })
    stars: number;

    @Column({ name: 'price' })
    price: number;

    @Column({ name: 'image' })
    image: string;

    @Column({ name: 'rooms', default: 1 })
    rooms: number;

    @OneToMany(() => BookingsEntity, (booking) => booking.hotelId)
    bookings: BookingsEntity[];

    @ManyToMany(() => ServicesEntity)
    @JoinTable({ name: 'hotel_services' })
    services: ServicesEntity[];

    @CreateDateColumn({ name: 'created_at_19118036' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at_19118036' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at_19118036' })
    deletedAt: Date;
}
