import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialSchema1744729314130 implements MigrationInterface {
    name = 'CreateInitialSchema1744729314130'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`note\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`content\` varchar(255) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`taskId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`task\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`title\` varchar(255) NOT NULL,
                \`description\` text NOT NULL,
                \`status\` enum ('todo', 'in_progress', 'done') NOT NULL DEFAULT 'todo',
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`note\`
            ADD CONSTRAINT \`FK_202af1cf1b6c5e03fb8f1c4748c\` FOREIGN KEY (\`taskId\`) REFERENCES \`task\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`note\` DROP FOREIGN KEY \`FK_202af1cf1b6c5e03fb8f1c4748c\`
        `);
        await queryRunner.query(`
            DROP TABLE \`task\`
        `);
        await queryRunner.query(`
            DROP TABLE \`note\`
        `);
    }

}
