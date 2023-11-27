import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: "mssql",
    host: "DESKTOP-IIR2RBS\\SQLEXPRESS",
    username: "Maci",
    password: "123",
    database: "hotelPro_19118036",
    synchronize: true,
    logging: true,
    entities: ["dist/**/*.entity.js"],
    options: { encrypt: false },
    migrations: ["dist/db/migrations/*.js"],
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;