import { MigrationInterface, QueryRunner } from "typeorm"

export class UsersTriggers1695577272272 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            CREATE TRIGGER [dbo].[lOG_USERS] ON [dbo].[users]
            AFTER INSERT
            AS
            BEGIN
                DECLARE @table_name nchar(25)
                SELECT @table_name = 'USERS'
                FROM INSERTED
                INSERT INTO log_19118036 (table_name, operation_type)
                VALUES(@table_name, 'INSERT')
            END
        `);

        await queryRunner.query(`
            CREATE TRIGGER [dbo].[lOG_USERS_UPDATE] ON [dbo].[users]
            AFTER UPDATE
            AS
            BEGIN
                DECLARE @table_name nchar(25)
                SELECT @table_name = 'USERS'
                FROM INSERTED
                INSERT INTO log_19118036 (table_name, operation_type)
                VALUES(@table_name, 'UPDATE')
            END
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER [dbo].[lOG_USERS] ON [dbo].[users]`);
        await queryRunner.query(`DROP TRIGGER [dbo].[lOG_USERS_UPDATE] ON [dbo].[users]`);
    }
}
