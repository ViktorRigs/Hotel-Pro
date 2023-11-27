import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelDto } from 'src/app/dto/hotel.dto';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
    selector: 'app-edit-hotel',
    templateUrl: './edit-hotel.component.html',
    styleUrls: ['./edit-hotel.component.css']
})
export class EditHotelComponent implements OnInit {

    form!: UntypedFormGroup;
    hotel: any
    hotelId!: number

    constructor(
        private _fb: NonNullableFormBuilder,
        private _hotelService: HotelService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {

        this.hotelId = this._activatedRoute.snapshot.params['id']
        this._hotelService.getById(this.hotelId).subscribe({
            next: (data) => {

                this.hotel = data;
                this.initializeForm();
            }
        })


        this.form = this._fb.group({
            name: [this.hotel?.name],
            address: [this.hotel?.address],
            rooms: [this.hotel?.rooms, [Validators.min(0)]],
            stars: [this.hotel?.stars, [Validators.min(0)]],
            price: [this.hotel?.price, [Validators.min(0)]],
            image: [this.hotel?.image],
        })
    }

    formatDate(dateString: string): string {
        if (!dateString) return '';

        const date = new Date(dateString);
        return date.toLocaleString();
    }


    initializeForm() {
        this.form = this._fb.group({
            name: [this.hotel?.name],
            address: [this.hotel?.address],
            rooms: [this.hotel?.rooms, [Validators.min(0)]],
            stars: [this.hotel?.stars, [Validators.min(0)]],
            price: [this.hotel?.price, [Validators.min(0)]],
            image: [this.hotel?.image],
        })
    }

    onSubmit = () => {
        const hotel = this.form.value as HotelDto;

        this._hotelService.updateHotel(this.hotelId, hotel).subscribe({
            next: (data) => {
                this._router.navigate([`/hotels/${this.hotelId}`]);
                this._snackBar.open('Hotel Updated', 'OK', {
                    duration: 6000,
                    horizontalPosition: 'right',
                })
            }, error: () => {
                this._snackBar.open('Error Updating Hotel', 'OK', {
                    duration: 6000,
                    horizontalPosition: 'right',
                })
            }
        })

    }

}
