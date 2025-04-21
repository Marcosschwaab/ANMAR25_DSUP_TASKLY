import { MigrationInterface, QueryRunner } from "typeorm";

export class AddToCategoryToTaskSchema1745278628308 implements MigrationInterface {
    name = 'AddToCategoryToTaskSchema1745278628308'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`task\`
            ADD \`category\` enum (
                    'anonymous',
                    'backend',
                    'frontend',
                    'design',
                    'devops'
                ) NOT NULL DEFAULT 'anonymous'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`task\` DROP COLUMN \`category\`
        `);
    }

}
