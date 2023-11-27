import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { EditUserDto } from 'src/app/dto/user.dto';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {


    loggedUser?: any
    form!: UntypedFormGroup;

    constructor(
        private _fb: NonNullableFormBuilder,
        private authService: AuthService,
        private _userService: UserService,
        private _snackBar: MatSnackBar,
        private _router: Router,
    ) { }


    ngOnInit(): void {

        this.loggedUser = this.authService.getUserData()

        this.form = this._fb.group({
            firstName: [this.loggedUser?.firstName],
            lastName: [this.loggedUser?.lastName],
            email: [this.loggedUser?.email],
        })

        this.initializeForm();
    }


    formatDate(dateString: string): string {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleString();
    }

    initializeForm() {
        this.form = this._fb.group({
            firstName: [this.loggedUser?.firstName],
            lastName: [this.loggedUser?.lastName],
            email: [this.loggedUser?.email],
        })
    }

    onSubmit = () => {
        const user = this.form.value as EditUserDto;

        this._userService.editUser(this.loggedUser.id, user).subscribe({
            next: () => {
                this.loggedUser.email = user.email
                this.loggedUser.firstName = user.firstName
                this.loggedUser.lastName = user.lastName
                localStorage.setItem('user_data', JSON.stringify(this.loggedUser));
                this._router.navigate([`/profile`]);
                this._snackBar.open('Info Updated', 'OK', {
                    duration: 6000,
                    horizontalPosition: 'right',
                })
            }, error: () => {
                this._snackBar.open('Error Updating User Info', 'OK', {
                    duration: 6000,
                    horizontalPosition: 'right',
                })
            }
        })
    }
}
