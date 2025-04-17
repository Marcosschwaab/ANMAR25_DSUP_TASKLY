import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategoryEntity1744917419703 implements MigrationInterface {
    name = 'AddCategoryEntity1744917419703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`category\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(155) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`taskId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`category\`
            ADD CONSTRAINT \`FK_754e4ffd6eb891820faf3f47abc\` FOREIGN KEY (\`taskId\`) REFERENCES \`task\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_754e4ffd6eb891820faf3f47abc\`
        `);
        await queryRunner.query(`
            DROP TABLE \`category\`
        `);
    }

}
