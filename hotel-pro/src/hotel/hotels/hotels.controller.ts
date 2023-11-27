import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelEntity } from 'src/entities/hotel.entity';

@Controller('hotels')
export class HotelsController {
    constructor(private readonly hotelsService: HotelsService) { }

    @Get()
    findAll() {
        return this.hotelsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.hotelsService.findOneHotelById(id)
    }

    @Post('create')
    create(@Body() createHotelDto: Partial<HotelEntity>) {
        return this.hotelsService.create(createHotelDto);
    }

    @Put('/update/:id')
    update(@Param('id') id: number, @Body() updateHotelDto: Partial<HotelEntity>) {
        return this.hotelsService.update(id, updateHotelDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.hotelsService.remove(id);
    }
}
