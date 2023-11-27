import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RefreshService {
    private loggedInSubject = new BehaviorSubject<boolean>(false);

    get userLoggedIn() {
        return this.loggedInSubject.asObservable();
    }

    loginUser() {
        // Perform your login logic here
        this.loggedInSubject.next(true); // Notify subscribers that the user is logged in
    }

    logoutUser() {
        // Perform your logout logic here
        this.loggedInSubject.next(false); // Notify subscribers that the user is logged out
    }
}
