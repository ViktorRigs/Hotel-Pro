import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingDto } from '../dto/booking.dto';

@Injectable({
    providedIn: 'root'
})
export class BookingService {

    constructor(private http: HttpClient) { }

    createBooking(booking: BookingDto) {
        return this.http.post('http://localhost:3000/bookings', booking);
    }
}
