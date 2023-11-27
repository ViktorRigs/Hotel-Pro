import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { RefreshService } from '../refreshHeader/refresh.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {


	isAuthenticated: boolean = false
	loggedInUser: any
	private userLoggedInSubscription?: Subscription;

	constructor(private _router: Router,
		private _authService: AuthService,
		private refreshService: RefreshService,) { }


	ngOnInit(): void {
		this.isAuthenticated = this._authService.isAuthenticated()
		this.loggedInUser = this._authService.getUserData()

		this.userLoggedInSubscription = this.refreshService.userLoggedIn.subscribe(() => {
			this.refreshData();
		});

	}

	redirectToCreateHotel() {
		this._router.navigate(['/add-hotel'])
	}

	redirectToHome() {
		this._router.navigate(['/home'])
	}

	redirectToLogin() {
		this._router.navigate(['/login'])
	}

	redirectToRegister() {
		this._router.navigate(['/register'])
	}

	redirectToProfile() {
		this._router.navigate(['/profile'])
	}

	logOut() {
		this._authService.logOut()
		this.ngOnInit()
		this.redirectToLogin()
	}

	refreshData() {
		this.isAuthenticated = this._authService.isAuthenticated();
		this.loggedInUser = this._authService.getUserData();
	}
}
