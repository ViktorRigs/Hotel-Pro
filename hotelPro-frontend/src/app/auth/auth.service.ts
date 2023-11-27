import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private apiUrl = 'http://localhost:3000/auth';

	constructor(private http: HttpClient) { }

	userLoggedIn: EventEmitter<void> = new EventEmitter<void>();

	login(email: string, password: string): Observable<any> {
		const body = { email, password };
		this.userLoggedIn.emit();
		return this.http.post(`${this.apiUrl}/login`, body);
	}

	register(email: string, password: string, firstName: string, lastName: string, role: boolean): Observable<any> {
		const body = { email, password, firstName, lastName, role };
		return this.http.post(`${this.apiUrl}/register`, body);
	}

	isAuthenticated(): boolean {
		return !!localStorage.getItem('access_token');
	}

	getUserData() {
		const userDataString = localStorage.getItem('user_data');
		return userDataString ? JSON.parse(userDataString) : null;
	}

	logOut() {
		localStorage.removeItem('user_data');
		localStorage.removeItem('access_token');
	}
}
