import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelDto } from 'src/dtos/hotel.dto';
import { HotelEntity } from 'src/entities/hotel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HotelsService {
    constructor(
        @InjectRepository(HotelEntity)
        private readonly hotelRepository: Repository<HotelEntity>,
    ) { }

    async findAll(): Promise<HotelEntity[]> {
        return this.hotelRepository.find();
    }

    async findOneHotelById(id: number): Promise<HotelEntity> {
        const hotel = await this.hotelRepository.findOneBy({ id: id });
        if (!hotel) {
            throw new NotFoundException(`Hotel with ID ${id} not found`);
        }
        return hotel;
    }

    async create(createHotelDto: Partial<HotelEntity>): Promise<HotelEntity> {
        const newHotel = this.hotelRepository.create(createHotelDto);
        return this.hotelRepository.save(newHotel);
    }

    async update(id: number, updateHotelDto: Partial<HotelEntity>) {
        const hotel = await this.hotelRepository.findOneBy({ id: id });
        if (!hotel) {
            throw new NotFoundException('Hotel not found');
        }

        Object.assign(hotel, updateHotelDto);

        const updatedHotel = await this.hotelRepository.save(hotel);

        return updatedHotel;

    }

    async remove(id: number): Promise<void> {
        await this.hotelRepository.softDelete({ id: id });
    }
}
