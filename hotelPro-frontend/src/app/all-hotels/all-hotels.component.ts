import { Component, OnInit } from '@angular/core';
import { HotelService } from '../services/hotel.service';
import { Router } from '@angular/router';
import { ExcelExportService } from './export-excel.service';
import { HotelDto } from '../dto/hotel.dto';

@Component({
	selector: 'app-all-hotels',
	templateUrl: './all-hotels.component.html',
	styleUrls: ['./all-hotels.component.css']
})
export class AllHotelsComponent implements OnInit {

	hotels: HotelDto[] = [];
	searchQuery: string = '';
	filteredHotels: HotelDto[] = [];
	sortOption: string = 'name';
	sortDirection: number = 1;

	constructor(private _hotelsService: HotelService,
		private _router: Router,
		private _excelExportService: ExcelExportService) { }

	ngOnInit() {
		this._hotelsService.getAllHotels().subscribe((data) => {
			this.hotels = data;
			this.filteredHotels = this.hotels;
			this.sortFilteredHotels()
		});
	}

	navigateToDetails(id: number) {
		this._router.navigate([`/hotels/${id}`]);
	}

	onSearch() {
		this.filteredHotels = this.hotels.filter((h) => {
			return h.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || h.address.toLowerCase().includes(this.searchQuery.toLowerCase())
		});

		this.sortFilteredHotels()
	}

	sortFilteredHotels() {
		this.filteredHotels.sort((a, b) => {
			let propA = a[this.sortOption as keyof HotelDto];
			let propB = b[this.sortOption as keyof HotelDto];

			if (typeof propA === 'string' && typeof propB === 'string') {
				propA = propA.toLowerCase();
				propB = propB.toLowerCase();
			}

			if (propA < propB) {
				return -1 * this.sortDirection;
			} else if (propA > propB) {
				return 1 * this.sortDirection;
			} else {
				return 0;
			}
		});
	}

	toggleSortDirection() {
		this.sortDirection = -this.sortDirection;
		this.sortFilteredHotels();
	}

	setSortOption(option: string) {
		if (option === 'name') {
			if (this.sortOption === 'name') {
				this.sortDirection = -this.sortDirection;
			} else {
				this.sortOption = option;
				this.sortDirection = 1;
			}
		} else if (option === 'price') {
			if (this.sortOption === 'price') {
				this.sortDirection = -this.sortDirection;
			} else {
				this.sortOption = option;
				this.sortDirection = 1;
			}
		}

		this.sortFilteredHotels();
	}

	exportHotels() {
		const dataToExport = this.filteredHotels.length
			? this.filteredHotels
			: this.hotels;

		this._excelExportService.exportToExcel(
			dataToExport,
			'hotels',
			'HotelsSheet'
		);
	}

}
