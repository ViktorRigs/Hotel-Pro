import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingsEntity } from 'src/entities/bookings.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookingsService {
    constructor(
        @InjectRepository(BookingsEntity) private readonly repository: Repository<BookingsEntity>) { }

    async createBooking(bookingData: Partial<BookingsEntity>): Promise<BookingsEntity> {

        const booking = new BookingsEntity();

        booking.checkInDate = bookingData.checkInDate;
        booking.checkOutDate = bookingData.checkOutDate;
        booking.customerName = bookingData.customerName;
        booking.customerEmail = bookingData.customerEmail;
        booking.userId = bookingData.userId;
        booking.hotelId = bookingData.hotelId;

        return await this.repository.save(booking);
    }


}