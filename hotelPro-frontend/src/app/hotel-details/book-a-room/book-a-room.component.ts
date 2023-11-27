import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { BookingDto } from 'src/app/dto/booking.dto';
import { BookingService } from 'src/app/services/booking.service';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
    selector: 'app-book-a-room',
    templateUrl: './book-a-room.component.html',
    styleUrls: ['./book-a-room.component.css']
})
export class BookARoomComponent implements OnInit {

    form!: UntypedFormGroup
    hotel: any
    loggedUser: any

    constructor(private _fb: NonNullableFormBuilder,
        private _hotelService: HotelService,
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _bookingService: BookingService,
        private _router: Router,
        private _snackbar: MatSnackBar) { }

    ngOnInit(): void {
        const hotelId = this._activatedRoute.snapshot.params['id']
        this.loggedUser = this._authService.getUserData()

        this._hotelService.getById(hotelId).subscribe(data => {
            this.hotel = data;
        })

        this.form = this._fb.group({
            checkInDate: ['', Validators.required],
            checkOutDate: ['', Validators.required],
        })
    }

    onSubmit() {
        const booking = this.form.value as BookingDto
        booking.userId = this.loggedUser.id
        booking.customerName = this.loggedUser.firstName + ' ' + this.loggedUser.lastName
        booking.customerEmail = this.loggedUser.email
        booking.hotelId = this.hotel.id

        this._bookingService.createBooking(booking).subscribe({
            next: (data) => {
                booking.hotel = { id: this.hotel.id }
                this.loggedUser.bookings.push(booking)
                localStorage.setItem('user_data', JSON.stringify(this.loggedUser));

                this._router.navigate(['/home'])
                this._snackbar.open('Room booked successfully!', 'Ok', { duration: 2000, horizontalPosition: 'right' })
            }
        })

    }
}
