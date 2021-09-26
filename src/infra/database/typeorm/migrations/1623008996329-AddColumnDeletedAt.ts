import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnDeletedAt1623008996329 implements MigrationInterface {
  name = 'AddColumnDeletedAt1623008996329';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "t_job_works" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_categories" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_states" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_cities" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE "t_users" ADD "deleted_at" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "t_users" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "t_cities" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "t_states" DROP COLUMN "deleted_at"`);
    await queryRunner.query(
      `ALTER TABLE "t_categories" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_job_works" DROP COLUMN "deleted_at"`,
    );
  }
}
