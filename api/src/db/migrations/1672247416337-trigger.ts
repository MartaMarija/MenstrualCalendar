import { MigrationInterface, QueryRunner } from "typeorm"

export class trigger1672247416337 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const schemaName: string = process.env.DB_SCHEMA || 'mencal';

        await queryRunner.query(`set schema '${schemaName}';`);

    }

    down(): Promise<void> {
        throw new Error('Method not implemented.');
    }

}
