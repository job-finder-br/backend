import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovedColumn1623003539456 implements MigrationInterface {
  name = 'RemovedColumn1623003539456';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "t_states" DROP CONSTRAINT "UQ_070407b7129be926ff71b002f2d"`,
    );
    await queryRunner.query(`ALTER TABLE "t_states" DROP COLUMN "abbrev_name"`);
    await queryRunner.query(
      `ALTER TABLE "t_cities" DROP CONSTRAINT "UQ_95c002ba1524fe73a4d4ad443b9"`,
    );
    await queryRunner.query(`ALTER TABLE "t_cities" DROP COLUMN "abbrev_name"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "t_cities" ADD "abbrev_name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_cities" ADD CONSTRAINT "UQ_95c002ba1524fe73a4d4ad443b9" UNIQUE ("abbrev_name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_states" ADD "abbrev_name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "t_states" ADD CONSTRAINT "UQ_070407b7129be926ff71b002f2d" UNIQUE ("abbrev_name")`,
    );
  }
}
