import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../services/hotel.service';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-hotel-details',
	templateUrl: './hotel-details.component.html',
	styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit {

	loggedUser: any
	hotel: any
	hotelId: number = 0

	constructor(private _router: Router,
		private _route: ActivatedRoute,
		private _authService: AuthService,
		private _hotelService: HotelService,
		private _snackBar: MatSnackBar) { }

	ngOnInit(): void {
		this.loggedUser = this._authService.getUserData();

		this._route.params.subscribe(params => {
			this.hotelId = +params['id'];
			this._hotelService.getById(this.hotelId).subscribe({
				next: (data) => {
					this.hotel = data;
				}
			});
		});
	}

	deleteHotel() {
		this._hotelService.deleteHotel(this.hotelId).subscribe({
			next: () => {
				this._snackBar.open('Hotel deleted', 'OK', {
					duration: 6000,
					horizontalPosition: 'right',
				})
				this._router.navigate([`/home`]);

			}, error: () => {
				this._snackBar.open('Error Deleting Hotel', 'OK', {
					duration: 6000,
					horizontalPosition: 'right',
				})
			}
		})
	}

	editHotel() {
		this._router.navigate([`/hotels/edit/${this.hotelId}`]);
	}

	bookARoom() {
		this._router.navigate([`/hotels/book/${this.hotelId}`]);
	}

	hasBookingForCurrentHotel(): boolean {
		const userLoggedIn = this._authService.getUserData();
		if (userLoggedIn && userLoggedIn.bookings && this.hotel) {
			return userLoggedIn.bookings.some((booking: any) => booking.hotelId.id === this.hotel.id);
		}
		return false;
	}
}
