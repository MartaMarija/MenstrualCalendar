import { MigrationInterface, QueryRunner } from 'typeorm';

export class table1672245702970 implements MigrationInterface 
{
	public async up( queryRunner: QueryRunner ): Promise<void> 
	{
		const schemaName: string = process.env.DB_SCHEMA || 'mencal';

		await queryRunner.query( `set schema '${schemaName}';` );

		await queryRunner.query(
			`
                DROP TABLE IF EXISTS "user" CASCADE;
                CREATE TABLE "user" (
                    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                    "createdAt" timestamp NOT NULL DEFAULT now(),
                    "updatedAt" timestamp NOT NULL DEFAULT now(),
                    "deletedAt" timestamp NULL,
                    "first_name" varchar(45) NOT NULL,
                    "last_name" varchar(45) NOT NULL,
                    "email" varchar(45) NOT NULL,
                    "password" varchar NOT NULL,
                    "avg_duration_of_menstrual_cycle" int NOT NULL,
                    "avg_duration_of_menstruation" int NOT NULL,
                    "avg_duration_of_luteal_phase" int NOT NULL,
                    CONSTRAINT "emailUnique" UNIQUE (email)
                );

                DROP TABLE IF EXISTS "refresh_token" CASCADE;
                CREATE TABLE "refresh_tokens" (
                    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                    "createdAt" timestamp NOT NULL DEFAULT now(),
                    "updatedAt" timestamp NOT NULL DEFAULT now(),
                    "deletedAt" timestamp NULL,
                    "refresh_token" varchar NOT NULL,
                    "userId" uuid NOT NULL,
                    CONSTRAINT "refresh_tokens_user_fk"
                    FOREIGN KEY ("userId") 
                    REFERENCES "user"(id) ON DELETE CASCADE
                );

                DROP TABLE IF EXISTS "description_type" CASCADE;
                CREATE TABLE "description_type" (
                    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                    "createdAt" timestamp NOT NULL DEFAULT now(),
                    "updatedAt" timestamp NOT NULL DEFAULT now(),
                    "deletedAt" timestamp NULL,
                    "name" varchar(25) NOT NULL
                );

                DROP TABLE IF EXISTS "description" CASCADE;
                CREATE TABLE "description" (
                    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                    "createdAt" timestamp NOT NULL DEFAULT now(),
                    "updatedAt" timestamp NOT NULL DEFAULT now(),
                    "deletedAt" timestamp NULL,
                    "name" varchar(25) NOT NULL,
                    "description_type_id" uuid,
                    CONSTRAINT "description_description_type_fk"
                    FOREIGN KEY("description_type_id") 
                    REFERENCES "description_type"(id)
                );

                DROP TABLE IF EXISTS "day" CASCADE;
                CREATE TABLE "day" (
                    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                    "createdAt" timestamp NOT NULL DEFAULT now(),
                    "updatedAt" timestamp NOT NULL DEFAULT now(),
                    "deletedAt" timestamp NULL,
                    "date" date NOT NULL,
                    "user_id" uuid NOT NULL,
                    CONSTRAINT "day_user_fk"
                    FOREIGN KEY("user_id") 
                    REFERENCES "user"(id) ON DELETE CASCADE,
                    "description_id" uuid NOT NULL,
                    CONSTRAINT "day_description_fk"
                    FOREIGN KEY("description_id") 
                    REFERENCES "description"(id) ON DELETE CASCADE
                );

                DROP TABLE IF EXISTS "menstrual_cycle" CASCADE;
                CREATE TABLE "menstrual_cycle" (
                    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                    "createdAt" timestamp NOT NULL DEFAULT now(),
                    "updatedAt" timestamp NOT NULL DEFAULT now(),
                    "deletedAt" timestamp NULL,
                    "cycle_duration" int,
                    "menstruation_duration" int,
                    "luteal_phase_duration" int,
                    "cycle_start_date" date,
                    "menstruation_end_date" date,
                    "ovulation_date" date,
                    "userId" uuid NOT NULL,
                    CONSTRAINT "menstrual_cycle_user_fk"
                    FOREIGN KEY("userId") 
                    REFERENCES "user"(id) ON DELETE CASCADE
                );

                DROP TABLE IF EXISTS "gynecologist" CASCADE;
                CREATE TABLE "gynecologist" (
                    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                    "createdAt" timestamp NOT NULL DEFAULT now(),
                    "updatedAt" timestamp NOT NULL DEFAULT now(),
                    "deletedAt" timestamp NULL,
                    "first_name" varchar(45) NOT NULL,
                    "last_name" varchar(45),
                    "telephone" varchar(20),
                    "address" varchar(60),
                    "userId" uuid NOT NULL,
                    CONSTRAINT "gynecologist_user_fk"
                    FOREIGN KEY("userId") 
                    REFERENCES "user"(id) ON DELETE CASCADE
                );

                DROP TABLE IF EXISTS "medical_exam" CASCADE;
                CREATE TABLE "medical_exam" (
                    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                    "createdAt" timestamp NOT NULL DEFAULT now(),
                    "updatedAt" timestamp NOT NULL DEFAULT now(),
                    "deletedAt" timestamp NULL,
                    "date" date,
                    "description" varchar(200),
                    "gynecologistId" uuid,
                    "userId" uuid NOT NULL,
                    CONSTRAINT "medical_exam_gynecologist_fk"
                    FOREIGN KEY("gynecologistId") 
                    REFERENCES gynecologist(id) ON DELETE SET NULL,
                    CONSTRAINT "medical_exam_user_fk"
                    FOREIGN KEY("userId")
                    REFERENCES "user"(id) ON DELETE CASCADE
                );
            `
		);
	}

	down(): Promise<void> 
	{
		throw new Error( 'Method not implemented.' );
	}
}
