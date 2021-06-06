import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovedColumnuserName1623006267450 implements MigrationInterface {
  name = 'RemovedColumnuserName1623006267450';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "t_users" DROP CONSTRAINT "UQ_debe25407509fdc4a029c4505a5"`,
    );
    await queryRunner.query(`ALTER TABLE "t_users" DROP COLUMN "username"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "t_users" ADD "username" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_users" ADD CONSTRAINT "UQ_debe25407509fdc4a029c4505a5" UNIQUE ("username")`,
    );
  }
}
