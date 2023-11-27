import { Body, Controller, Post } from '@nestjs/common';
import { BookingsService } from '../bookings/bookings.service';
import { BookingsEntity } from 'src/entities/bookings.entity';

@Controller('bookings')
export class BookingsControllerController {
    constructor(private readonly bookingsService: BookingsService) { }

    @Post()
    async createBooking(@Body() bookingData: Partial<BookingsEntity>): Promise<BookingsEntity> {
        return this.bookingsService.createBooking(bookingData);
    }
}