import { MigrationInterface, QueryRunner } from "typeorm"

export class Migrations1695381956318 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO roles (name, description)
            VALUES
                ('admin', 'administrating role'),
                ('owner', 'owner of a hotel'),
                ('customer', 'general customer');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM roles WHERE name IN ('admin', 'owner', 'customer');
        `);
    }
}
