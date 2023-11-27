import { MigrationInterface, QueryRunner } from "typeorm"

export class Migrations1695575947206 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TRIGGER [dbo].[lOG_BOOKINGS] ON [dbo].[bookings]
            AFTER INSERT
            AS
            BEGIN
                DECLARE @table_name nchar(25)
                SELECT @table_name = 'BOOKINGS'
                FROM INSERTED
                INSERT INTO log_19118036 (table_name, operation_type)
                VALUES(@table_name, 'INSERT')
            END
        `);

        await queryRunner.query(`
            CREATE TRIGGER [dbo].[lOG_BOOKINGS_UPDATE] ON [dbo].[bookings]
            AFTER UPDATE
            AS
            BEGIN
                DECLARE @table_name nchar(25)
                SELECT @table_name = 'BOOKINGS'
                FROM INSERTED
                INSERT INTO log_19118036 (table_name, operation_type)
                VALUES(@table_name, 'UPDATE')
            END
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER [dbo].[lOG_BOOKINGS] ON [dbo].[bookings]`);
        await queryRunner.query(`DROP TRIGGER [dbo].[lOG_BOOKINGS_UPDATE] ON [dbo].[bookings]`);
    }
}
