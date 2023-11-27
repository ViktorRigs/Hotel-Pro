import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookingsEntity } from 'src/entities/bookings.entity';
import { BookingsService } from './bookings.service';
import { BookingsControllerController } from '../bookings-controller/bookings-controller.controller';

@Module({
    imports: [TypeOrmModule.forFeature([BookingsEntity])],
    providers: [BookingsService],
    controllers: [BookingsControllerController],
    exports: [BookingsService],
})
export class BookingsModule {
}