import { MigrationInterface, QueryRunner } from 'typeorm';

export class AltertableColumnUnique1623201693108 implements MigrationInterface {
  name = 'AltertableColumnUnique1623201693108';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "t_job_works" DROP CONSTRAINT "UQ_92e5722f2c435296b541ae51b9c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_users" DROP CONSTRAINT "UQ_5d749f3c9c3f9a5c0d48241b1f3"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "t_users" ADD CONSTRAINT "UQ_5d749f3c9c3f9a5c0d48241b1f3" UNIQUE ("phone_number")`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_job_works" ADD CONSTRAINT "UQ_92e5722f2c435296b541ae51b9c" UNIQUE ("phone_number")`,
    );
  }
}
