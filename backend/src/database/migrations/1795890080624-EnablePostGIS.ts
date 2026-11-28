import { MigrationInterface, QueryRunner } from 'typeorm';

export class EnablePostGIS1795890080624 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS postgis');
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    // PostGIS is intentionally preserved to protect spatial data.
  }
}
