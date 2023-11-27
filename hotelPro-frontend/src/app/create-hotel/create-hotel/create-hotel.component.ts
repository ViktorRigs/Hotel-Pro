import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HotelDto } from 'src/app/dto/hotel.dto';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
	selector: 'app-create-hotel',
	templateUrl: './create-hotel.component.html',
	styleUrls: ['./create-hotel.component.css']
})
export class CreateHotelComponent implements OnInit {

	hotelForm: FormGroup;
	user: any

	constructor(private formBuilder: FormBuilder, private _hotelService: HotelService, private _snackbar: MatSnackBar, private _router: Router, private _authService: AuthService) {
		this.hotelForm = this.formBuilder.group({
			name: ['', Validators.required],
			city: ['', Validators.required],
			rooms: [0, [Validators.min(0), Validators.required]],
			price: [0, [Validators.min(0), Validators.required]],
			image: ['', Validators.required],
			stars: [0, [Validators.min(0), Validators.required]],
		});
	}

	ngOnInit() {
		this.user = this._authService.getUserData()
	}


	onSubmit() {
		if (this.hotelForm.valid) {
			const hotel = this.hotelForm.value as HotelDto; //TODO form
			hotel.ownerId = this.user.id
			hotel.address = this.hotelForm.get('city')?.value
			hotel.stars = this.hotelForm.get('stars')?.value
			hotel.price = this.hotelForm.get('price')?.value

			this._hotelService.createHotel(hotel).subscribe({
				next: () => {
					this._snackbar.open('Hotel created successfully', 'OK', {
						duration: 3000,
						horizontalPosition: 'right',
					})
					this._router.navigate(['/home']);
				}
			})
		}
	}
}
