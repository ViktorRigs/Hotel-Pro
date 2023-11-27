import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelEntity } from 'src/entities/hotel.entity';
import { HotelsService } from './hotels.service';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [TypeOrmModule.forFeature([HotelEntity])],
    providers: [HotelsService],
    controllers: [HotelsController],
})

export class HotelsModule { }
