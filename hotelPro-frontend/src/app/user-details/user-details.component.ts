import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { HotelService } from '../services/hotel.service';

@Component({
	selector: 'app-user-details',
	templateUrl: './user-details.component.html',
	styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

	loggedUser?: any
	hotels: any[] = []

	constructor(
		private authService: AuthService,
		private _router: Router,
		private _hotelService: HotelService
	) { }

	ngOnInit() {
		this._hotelService.getAllHotels().subscribe({
			next: resp => {
				this.hotels = resp.filter(hotel => hotel.ownerId === this.loggedUser.id);
			}
		})
		this.loggedUser = this.authService.getUserData();
	}

	formatDate(dateString: string): string {
		if (!dateString) return '';

		const date = new Date(dateString);
		return date.toLocaleString();
	}

	redirectToEditUser() {
		this._router.navigate([`/user/${this.loggedUser.id}`]);
	}

	redirectToHotel(hotelId: number) {
		this._router.navigate([`/hotels/${hotelId}`]);
	}

}
