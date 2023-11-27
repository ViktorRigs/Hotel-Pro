import { Component, OnInit } from '@angular/core';
import { HotelService } from './services/hotel.service';
import { HotelDto } from './dto/hotel.dto';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'hotelPro-frontend';
	hotels: HotelDto[] = []
	constructor(private _hotelsService: HotelService) { }

	ngOnInit() {
		this._hotelsService.getAllHotels().subscribe((data) => {
			this.hotels = data;

		});

	}
}
