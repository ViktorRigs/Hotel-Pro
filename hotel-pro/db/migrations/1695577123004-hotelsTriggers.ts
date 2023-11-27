import { MigrationInterface, QueryRunner } from "typeorm"

export class HotelsTriggers1695577123004 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TRIGGER [dbo].[lOG_HOTELS] ON [dbo].[hotels]
            AFTER INSERT
            AS
            BEGIN
                DECLARE @table_name nchar(25)
                SELECT @table_name = 'HOTELS'
                FROM INSERTED
                INSERT INTO log_19118036 (table_name, operation_type)
                VALUES(@table_name, 'INSERT')
            END
        `);

        await queryRunner.query(`
            CREATE TRIGGER [dbo].[lOG_HOTELS_UPDATE] ON [dbo].[hotels]
            AFTER UPDATE
            AS
            BEGIN
                DECLARE @table_name nchar(25)
                SELECT @table_name = 'HOTELS'
                FROM INSERTED
                INSERT INTO log_19118036 (table_name, operation_type)
                VALUES(@table_name, 'UPDATE')
            END
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER [dbo].[lOG_HOTELS] ON [dbo].[hotels]`);
        await queryRunner.query(`DROP TRIGGER [dbo].[lOG_HOTELS_UPDATE] ON [dbo].[hotels]`);
    }
}
