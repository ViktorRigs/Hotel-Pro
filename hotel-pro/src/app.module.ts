import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { HotelsModule } from './hotel/hotels/hotels.module';
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings/bookings.module';

@Module({
	imports: [
		UsersModule,
		HotelsModule,
		BookingsModule,
		AuthModule,
		TypeOrmModule.forRoot(dataSourceOptions),
		//TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
