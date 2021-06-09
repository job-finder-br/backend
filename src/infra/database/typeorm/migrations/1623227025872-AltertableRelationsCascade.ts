import { MigrationInterface, QueryRunner } from 'typeorm';

export class AltertableRelationsCascade1623227025872
  implements MigrationInterface
{
  name = 'AltertableRelationsCascade1623227025872';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "t_job_works" DROP CONSTRAINT "FK_dbbab054138070e41ae19861485"`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_users_favorites_jobs" DROP CONSTRAINT "FK_42718d28752baf8a5697dec4950"`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_users_favorites_jobs" DROP CONSTRAINT "FK_2dc2dbb669d96be1bb4f1861a1f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_job_works" ADD CONSTRAINT "FK_dbbab054138070e41ae19861485" FOREIGN KEY ("fk_user_id") REFERENCES "t_users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_users_favorites_jobs" ADD CONSTRAINT "FK_42718d28752baf8a5697dec4950" FOREIGN KEY ("fk_user_id") REFERENCES "t_users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_users_favorites_jobs" ADD CONSTRAINT "FK_2dc2dbb669d96be1bb4f1861a1f" FOREIGN KEY ("fk_jobwork_id") REFERENCES "t_job_works"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "t_users_favorites_jobs" DROP CONSTRAINT "FK_2dc2dbb669d96be1bb4f1861a1f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_users_favorites_jobs" DROP CONSTRAINT "FK_42718d28752baf8a5697dec4950"`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_job_works" DROP CONSTRAINT "FK_dbbab054138070e41ae19861485"`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_users_favorites_jobs" ADD CONSTRAINT "FK_2dc2dbb669d96be1bb4f1861a1f" FOREIGN KEY ("fk_jobwork_id") REFERENCES "t_job_works"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_users_favorites_jobs" ADD CONSTRAINT "FK_42718d28752baf8a5697dec4950" FOREIGN KEY ("fk_user_id") REFERENCES "t_users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_job_works" ADD CONSTRAINT "FK_dbbab054138070e41ae19861485" FOREIGN KEY ("fk_user_id") REFERENCES "t_users"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }
}
