import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class BookingsDto {
    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @IsOptional()
    customerName: string;

    @IsString()
    @IsOptional()
    customerEmail: string;

    @IsString()
    @IsOptional()
    checkInDate: string;

    @IsString()
    @IsOptional()
    checkOutDate: string;

    @IsString()
    @IsOptional()
    HotelName: string;

    @IsDate()
    @IsOptional()
    createdAt: Date;

    @IsDate()
    @IsOptional()
    updatedAt: Date;
}