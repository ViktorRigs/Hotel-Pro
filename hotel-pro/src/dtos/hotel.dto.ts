import { IsString, IsNumber, IsOptional, IsArray, IsDate } from 'class-validator';

export class HotelDto {

	@IsNumber()
	@IsOptional()
	id: number;

	@IsString()
	@IsOptional()
	name: string;

	@IsString()
	@IsOptional()
	address: string;

	@IsNumber()
	@IsOptional()
	stars: number;

	@IsNumber()
	@IsOptional()
	price: number;

	@IsString()
	@IsOptional()
	image?: string;

	@IsOptional()
	services?: string[];

	@IsOptional()
	@IsDate()
	createdAt: Date;

	@IsOptional()
	@IsDate()
	updatedAt: Date;
}
