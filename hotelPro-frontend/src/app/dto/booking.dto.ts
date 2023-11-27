export class BookingDto {
    userId?: number;
    customerName?: string;
    customerEmail?: string;
    checkInDate?: string;
    checkOutDate?: string;
    hotelId?: number;
    hotel?: { id: number }
}
