import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateHotelComponent } from './create-hotel/create-hotel/create-hotel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AllHotelsComponent } from './all-hotels/all-hotels.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { LoginComponent } from './auth/login/login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './auth/register/register.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { EditHotelComponent } from './hotel-details/edit-hotel/edit-hotel.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserDetailsComponent } from './user-details/user-details.component';
import { EditUserComponent } from './user-details/edit-user/edit-user.component';
import { BookARoomComponent } from './hotel-details/book-a-room/book-a-room.component';


const appRoutes: Routes = [
	{ path: 'home', component: AllHotelsComponent },
	{ path: 'hotels/:id', component: HotelDetailsComponent },
	{ path: 'hotels/edit/:id', component: EditHotelComponent },
	{ path: 'hotels/book/:id', component: BookARoomComponent },
	{ path: 'user/:id', component: EditUserComponent },
	{ path: 'add-hotel', component: CreateHotelComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'profile', component: UserDetailsComponent },
	{ path: '**', redirectTo: '/home' }
];

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		CreateHotelComponent,
		AllHotelsComponent,
		HotelDetailsComponent,
		LoginComponent,
		RegisterComponent,
		LogoutComponent,
		EditHotelComponent,
		UserDetailsComponent,
		EditUserComponent,
		BookARoomComponent
	],
	imports: [
		MatIconModule,
		MatInputModule,
		FormsModule,
		MatTooltipModule,
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		ReactiveFormsModule,
		MatSnackBarModule,
		RouterModule.forRoot(appRoutes)
	],
	providers: [HeaderComponent],
	bootstrap: [AppComponent]
})
export class AppModule { }
