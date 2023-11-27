import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EditUserDto } from '../dto/user.dto';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(private http: HttpClient) {

	}

	editUser(id: number, editUser: EditUserDto) {
		return this.http.put(`http://localhost:3000/users/${id}`, editUser);
	}


}
