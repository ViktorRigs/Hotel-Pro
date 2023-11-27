import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RefreshService } from 'src/app/shared/refreshHeader/refresh.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent {

	
	registerForm!: FormGroup

	constructor(private authService: AuthService, private formBuilder: FormBuilder, private _router: Router,
		private _snackBar: MatSnackBar,
		private _refreshService: RefreshService,) {
		this.registerForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			isHotelOwner: [false]
		});
	}

	register(username: string, password: string, firstName: string, lastName: string, role: boolean): void {
		this.authService.register(username, password, firstName, lastName, role).subscribe({
			next: () => {
				this.authService.login(username, password).subscribe({
					next: (response) => {
						localStorage.setItem('user_data', JSON.stringify(response.userData));
						localStorage.setItem('access_token', response.access_token);
						this._router.navigate(['/home']);
						this._refreshService.loginUser()
					}
				});
			},
			error: (error) => {
				console.error('Register failed:', error);
				this._snackBar.open('Email is already in use', 'OK', {
					duration: 6000,
					horizontalPosition: 'right',
				})
			}
		}
		);
	}

	onSubmit() {
		if (this.registerForm.valid) {
			this.register(this.registerForm.value.email,
				this.registerForm.value.password,
				this.registerForm.value.firstName,
				this.registerForm.value.lastName,
				this.registerForm.value.isHotelOwner
			);
		}
	}
}
