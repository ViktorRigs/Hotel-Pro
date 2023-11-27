import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RefreshService } from 'src/app/shared/refreshHeader/refresh.service';



@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent {

	loginForm: FormGroup

	constructor(
		private authService: AuthService,
		private formBuilder: FormBuilder,
		private _router: Router,
		private _refreshService: RefreshService,
		private _snackBar: MatSnackBar,) {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
		});
	}

	login(username: string, password: string): void {
		this.authService.login(username, password).subscribe({
			next: (response) => {
				localStorage.setItem('user_data', JSON.stringify(response.userData));
				localStorage.setItem('access_token', response.access_token);
				this._router.navigate(['/home']);
				this._refreshService.loginUser()
			},
			error: (error) => {
				console.error('Login failed:', error);
				this._snackBar.open('Wrong Email or Password', 'OK', {
					duration: 6000,
					horizontalPosition: 'right',
				})
			}
		});
	}

	onSubmit() {
		if (this.loginForm.valid) {
			this.login(this.loginForm.value.email, this.loginForm.value.password);
		}
	}
}
