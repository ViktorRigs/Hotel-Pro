import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    useFactory: async (): Promise<TypeOrmModuleOptions> => {
        return {
            type: 'mssql',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            entities: [__dirname + '/../**/*.entity.{js,ts}'],
            synchronize: true,
            logging: true,
        }
    }
}






















// import { TypeOrmModuleOptions } from "@nestjs/typeorm";
// import { BookingsEntity } from "src/entities/bookings.entity";
// import { HotelEntity } from "src/entities/hotel.entity";
// import { RoleEntity } from "src/entities/role.entity";
// import { ServicesEntity } from "src/entities/services.entity";
// import { UserEntity } from "src/entities/user.entity";

// export const config: TypeOrmModuleOptions = {
//     type: 'mssql',
//     host: 'DESKTOP-IIR2RBS\\SQLEXPRESS',  // replace with your host
//     port: 1433,
//     username: 'Maci',
//     password: '12345678',
//     database: 'hotelPro_19118036',
//     entities: [UserEntity, ServicesEntity, RoleEntity, HotelEntity, BookingsEntity],
//     synchronize: true,
//     extra: {
//         trustServerCertificate: true,
//     }
// }