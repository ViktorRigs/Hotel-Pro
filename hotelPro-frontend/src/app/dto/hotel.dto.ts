export class HotelDto {
    id!: number;
    name!: string;
    address!: string;
    ownerId?: number;
    owner?: any;
    stars?: number;
    price?: number;
    image?: string;
    services?: [];
    rooms?: number;
}