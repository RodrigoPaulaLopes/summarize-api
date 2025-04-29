import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class AddUserIdReferenceInSummarizeTable1745929975091 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn('summarize', new TableColumn({
            name: 'userId',
            type: 'uuid'
        }))

        await queryRunner.createForeignKey('summarize', new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onDelete: "CASCADE",
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("summarize") as Table
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("userId") !== -1,
        ) as TableForeignKey
        await queryRunner.dropForeignKey("summarize", foreignKey)
        await queryRunner.dropColumn("summarize", "userId")
    }

}
