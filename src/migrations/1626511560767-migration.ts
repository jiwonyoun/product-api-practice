import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1626511560767 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `product` ADD `test` VARCHAR2(100) NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
