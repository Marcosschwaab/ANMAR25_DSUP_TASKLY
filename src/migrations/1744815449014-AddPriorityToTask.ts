import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPriorityToTask1744815449014 implements MigrationInterface {
    name = 'AddPriorityToTask1744815449014'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`task\`
            ADD \`priority\` enum ('low', 'medium', 'high', 'critical') NOT NULL DEFAULT 'medium'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`task\` DROP COLUMN \`priority\`
        `);
    }

}
