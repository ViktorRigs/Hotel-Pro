import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class HotelService {

	private apiUrl = 'http://localhost:3000/hotels';


	constructor(private http: HttpClient) { }

	getAllHotels() {
		return this.http.get<any[]>(this.apiUrl);
	}

	// searchHotels(search: string): Observable<any> {

	// }

	getById(id: number) {
		return this.http.get<any>(`http://localhost:3000/hotels/${id}`);
	}

	createHotel(hotel: any) {
		return this.http.post('http://localhost:3000/hotels/create', hotel);
	}

	updateHotel(id: number, hotel: any) {
		return this.http.put(`http://localhost:3000/hotels/update/${id}`, hotel);
	}

	deleteHotel(id: number) {
		return this.http.delete(`http://localhost:3000/hotels/${id}`);
	}
}
