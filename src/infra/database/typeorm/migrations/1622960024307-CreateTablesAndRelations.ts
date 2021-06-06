import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablesAndRelations1622960024307
  implements MigrationInterface
{
  name = 'CreateTablesAndRelations1622960024307';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "t_job_works" ("id" uuid NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "remuneration_value" integer NOT NULL, "phone_number" character varying NOT NULL, "email" character varying NOT NULL, "type" character varying NOT NULL, "represents" character varying, "fk_user_id" uuid, "fk_category_id" uuid, "fk_city_id" uuid, CONSTRAINT "UQ_92e5722f2c435296b541ae51b9c" UNIQUE ("phone_number"), CONSTRAINT "UQ_a24381d0ec39333d271b45c44ad" UNIQUE ("email"), CONSTRAINT "PK_f471352205e69bd28fb9d955368" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "t_categories" ("id" uuid NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_a76fdad360eaf321382371c17e8" UNIQUE ("name"), CONSTRAINT "PK_2113b70a9eb36b361d5ec3c87da" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "t_states" ("id" uuid NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "abbrev_name" character varying NOT NULL, CONSTRAINT "UQ_0e46f13aca2ebb647cb45b1b97b" UNIQUE ("name"), CONSTRAINT "UQ_070407b7129be926ff71b002f2d" UNIQUE ("abbrev_name"), CONSTRAINT "PK_86650c53d05f5a26ef2858d2efa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "t_cities" ("id" uuid NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "abbrev_name" character varying NOT NULL, "fk_state_id" uuid, CONSTRAINT "UQ_9f690ca4941b30c16a2bb17fe5a" UNIQUE ("name"), CONSTRAINT "UQ_95c002ba1524fe73a4d4ad443b9" UNIQUE ("abbrev_name"), CONSTRAINT "PK_375da346b909545b6bcfc44a1b0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "t_users" ("id" uuid NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "description" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying, "curriculum" character varying, "phone_number" character varying NOT NULL, "is_recolocation" boolean NOT NULL DEFAULT false, "is_admin" boolean NOT NULL DEFAULT false, "fk_city_id" uuid, "fk_category_id" uuid, CONSTRAINT "UQ_debe25407509fdc4a029c4505a5" UNIQUE ("username"), CONSTRAINT "UQ_1b1275aba2e3044ce094936619c" UNIQUE ("email"), CONSTRAINT "UQ_5d749f3c9c3f9a5c0d48241b1f3" UNIQUE ("phone_number"), CONSTRAINT "PK_45e27b946b7f8cd527fd4fbe658" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "t_users_favorites_jobs" ("fk_user_id" uuid NOT NULL, "fk_jobwork_id" uuid NOT NULL, CONSTRAINT "PK_b6ca653391a0abbdc4e926c7059" PRIMARY KEY ("fk_user_id", "fk_jobwork_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_42718d28752baf8a5697dec495" ON "t_users_favorites_jobs" ("fk_user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2dc2dbb669d96be1bb4f1861a1" ON "t_users_favorites_jobs" ("fk_jobwork_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "t_job_works" ADD CONSTRAINT "FK_dbbab054138070e41ae19861485" FOREIGN KEY ("fk_user_id") REFERENCES "t_users"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_job_works" ADD CONSTRAINT "FK_952422167a7cc018fa3f23d943e" FOREIGN KEY ("fk_category_id") REFERENCES "t_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_job_works" ADD CONSTRAINT "FK_09c852e4749b008cef3d687fab5" FOREIGN KEY ("fk_city_id") REFERENCES "t_cities"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_cities" ADD CONSTRAINT "FK_db5314adb6c057728b84f833b34" FOREIGN KEY ("fk_state_id") REFERENCES "t_states"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_users" ADD CONSTRAINT "FK_7de23ae17ff1cb683a57409f5d2" FOREIGN KEY ("fk_city_id") REFERENCES "t_cities"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_users" ADD CONSTRAINT "FK_3f6f94405e364ec904885e44e61" FOREIGN KEY ("fk_category_id") REFERENCES "t_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_users_favorites_jobs" ADD CONSTRAINT "FK_42718d28752baf8a5697dec4950" FOREIGN KEY ("fk_user_id") REFERENCES "t_users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_users_favorites_jobs" ADD CONSTRAINT "FK_2dc2dbb669d96be1bb4f1861a1f" FOREIGN KEY ("fk_jobwork_id") REFERENCES "t_job_works"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
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
      `ALTER TABLE "t_users" DROP CONSTRAINT "FK_3f6f94405e364ec904885e44e61"`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_users" DROP CONSTRAINT "FK_7de23ae17ff1cb683a57409f5d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_cities" DROP CONSTRAINT "FK_db5314adb6c057728b84f833b34"`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_job_works" DROP CONSTRAINT "FK_09c852e4749b008cef3d687fab5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_job_works" DROP CONSTRAINT "FK_952422167a7cc018fa3f23d943e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_job_works" DROP CONSTRAINT "FK_dbbab054138070e41ae19861485"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_2dc2dbb669d96be1bb4f1861a1"`);
    await queryRunner.query(`DROP INDEX "IDX_42718d28752baf8a5697dec495"`);
    await queryRunner.query(`DROP TABLE "t_users_favorites_jobs"`);
    await queryRunner.query(`DROP TABLE "t_users"`);
    await queryRunner.query(`DROP TABLE "t_cities"`);
    await queryRunner.query(`DROP TABLE "t_states"`);
    await queryRunner.query(`DROP TABLE "t_categories"`);
    await queryRunner.query(`DROP TABLE "t_job_works"`);
  }
}
