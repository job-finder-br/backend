import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixesColumnType1622989077799 implements MigrationInterface {
  name = 'FixesColumnType1622989077799';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "t_job_works" DROP CONSTRAINT "FK_dbbab054138070e41ae19861485"`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_job_works" ALTER COLUMN "fk_user_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_job_works" ADD CONSTRAINT "FK_dbbab054138070e41ae19861485" FOREIGN KEY ("fk_user_id") REFERENCES "t_users"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "t_job_works" DROP CONSTRAINT "FK_dbbab054138070e41ae19861485"`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_job_works" ALTER COLUMN "fk_user_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_job_works" ADD CONSTRAINT "FK_dbbab054138070e41ae19861485" FOREIGN KEY ("fk_user_id") REFERENCES "t_users"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }
}
