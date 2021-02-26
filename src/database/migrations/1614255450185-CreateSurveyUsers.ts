import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurveyUsers1614255450185 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "surveys_users",
                columns:[
                    {
                        name: "id",
                        type: "varchar(36)",
                        default: "(uuid())",
                        isPrimary: true

                    },
                    {
                        name: "user_id",
                        type: "varchar(36)",
                        
                    },
                    {
                        name: "survey_id",
                        type: "varchar(36)",
                        
                    },
                    {
                        name: "value",
                        type: "int(100)",
                        isNullable:true

                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKUser",
                        referencedTableName: "users",
                        referencedColumnNames:["id"],
                        columnNames:["user_id"],
                        onDelete: "CASCADE",
                        onUpdate:  "CASCADE"
                    },
                    {
                        name: "FKSurvey",
                        referencedTableName: "surveys",
                        referencedColumnNames:["id"],
                        columnNames:["survey_id"],
                        onDelete: "CASCADE",
                        onUpdate:  "CASCADE"
                    },
                    
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("surveys_users");
    }

}
