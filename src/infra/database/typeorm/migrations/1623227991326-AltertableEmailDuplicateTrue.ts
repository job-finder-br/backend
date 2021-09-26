import { MigrationInterface, QueryRunner } from 'typeorm';

export class AltertableEmailDuplicateTrue1623227991326
  implements MigrationInterface
{
  name = 'AltertableEmailDuplicateTrue1623227991326';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "t_job_works" DROP CONSTRAINT "UQ_a24381d0ec39333d271b45c44ad"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "t_job_works" ADD CONSTRAINT "UQ_a24381d0ec39333d271b45c44ad" UNIQUE ("email")`,
    );
  }
}
