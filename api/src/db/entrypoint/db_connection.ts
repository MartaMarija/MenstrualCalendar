import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '../../model/entity/User';
import { Day } from '../../model/entity/Day';
import { Description } from '../../model/entity/Description';
import { DescriptionType } from '../../model/entity/DescriptionType';
import { MedicalExam } from '../../model/entity/MedicalExam';
import { Gynecologist } from '../../model/entity/Gynecologist';
import { MenstrualCycle } from '../../model/entity/MenstrualCycle';
dotenv.config();

export const AppDataSource = new DataSource( {
	type: 'postgres',
	host: process.env.DB_HOST || 'localhost',
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	port: parseInt( process.env.DB_PORT! ) || 5757,
	database: process.env.DB_NAME || 'mencaldb',
	schema: process.env.DB_SCHEMA || 'mencal',
	username: process.env.DB_USER || 'mencalusr',
	password: process.env.DB_PASSWORD || 'mencalpas',
	synchronize: false,
	logging: process.env.LOG_SQL === 'true', // Logs sql that gets executed on the database
	entities: [
		User,
		Day,
		Description,
		DescriptionType,
		MedicalExam,
		Gynecologist,
		MenstrualCycle,
	],
	migrations: ['dist/db/migrations/*.js'],
	migrationsTableName: 'changelog_master',
} );
