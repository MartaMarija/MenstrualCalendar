import { MigrationInterface, QueryRunner } from 'typeorm';

export class tableData1672247404926 implements MigrationInterface 
{
	public async up( queryRunner: QueryRunner ): Promise<void> 
	{
		const schemaName: string = process.env.DB_SCHEMA || 'mencal';

		await queryRunner.query( `set schema '${schemaName}';` );

		//All users have password: password
		await queryRunner.query(
			`
                INSERT INTO "user" VALUES
                ('27700306-06aa-4bd1-a3f4-67570384b5e1', default, default, default, 'Ana', 'Anić', 'ana@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$4J45ikrVP6rZXCk9pb9Xog$LEmDbLehEEAlEtOfeH9dpEKu9sDTGmsLdrua0BPlAYk', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI3NzAwMzA2LTA2YWEtNGJkMS1hM2Y0LTY3NTcwMzg0YjVlMSIsImlhdCI6MTY3NzA2MjExOSwiZXhwIjoxNjc4MjcxNzE5fQ.rGnhUOybLjvqXpqacTs5gdpXpsDvUgTKI3OBCHiiz0Q', 28, 3, 14),
                ('0ff0abcf-519c-4d47-b0f2-f65079284120', default, default, default, 'Jana', 'Janić', 'jana@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$4J45ikrVP6rZXCk9pb9Xog$LEmDbLehEEAlEtOfeH9dpEKu9sDTGmsLdrua0BPlAYk', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI3NzAwMzA2LTA2YWEtNGJkMS1hM2Y0LTY3NTcwMzg0YjVlMSIsImlhdCI6MTY3NzA2MTUzOSwiZXhwIjoxNjc4MjcxMTM5fQ.ewdB4619WYLHWUSxbeE6mRo8yio4tsvSeB7nPGMEc0M', 31, 5, 14),
                ('1cfd14e8-cbb1-40a3-a892-a4f8a185f024', default, default, default, 'Lana', 'Lanić', 'lana@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$4J45ikrVP6rZXCk9pb9Xog$LEmDbLehEEAlEtOfeH9dpEKu9sDTGmsLdrua0BPlAYk', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI3NzAwMzA2LTA2YWEtNGJkMS1hM2Y0LTY3NTcwMzg0YjVlMSIsImlhdCI6MTY3NzA2MTUzOSwiZXhwIjoxNjc4MjcxMTM5fQ.ewdB4619WYLHWUSxbeE6mRo8yio4tsvSeB7nPGMEc0M', 27, 6, 14);
                
                INSERT INTO "gynecologist" VALUES
                ('dceb1b3e-917f-4adc-b894-a84ef856d90f', default, default, default, 'Dom zdravlja', 'Fiona Horvat', '021/600-600', 'Zagrebačka ulica 3, 10000 Zagreb', '27700306-06aa-4bd1-a3f4-67570384b5e1'),
                ('d9d38929-4228-4ce8-82b3-3cb2ee651d10', default, default, default, 'Goran Anić', '', '021/700-600', 'Splićanska ulica 3, 21000 Split', '0ff0abcf-519c-4d47-b0f2-f65079284120'),
                ('0a1f35fe-6b76-45d6-9b0c-c1092e5f4a28', default, default, default, 'Poliklinika Gyn', 'Korana Rić', '021/540-640', 'Varaždinska ulica 3, 42000 Varaždin', '27700306-06aa-4bd1-a3f4-67570384b5e1');
            
                INSERT INTO "description_type" VALUES
                ('f4209131-9408-4b08-89b3-033ad9ebf99c', default, default, default, 'Symptom'),
                ('9c6d71a1-961a-4155-b842-146c82c1e8a9', default, default, default, 'Mood'),
                ('128b8c4e-72f1-4d44-9fd4-372e7c930a87', default, default, default, 'Discharge - color'),
                ('f5eb1061-c136-4c9c-89aa-dbbbb4f067df', default, default, default, 'Discharge - smell'),
                ('49bf5965-c012-4e91-9f6a-4b9cbb8fefc3', default, default, default, 'Discharge - texture');

                INSERT INTO "description" VALUES
                ('0a1f35fe-6b76-45d6-9b0c-c1092e5f4a28', default, default, default, 'Headache', 'f4209131-9408-4b08-89b3-033ad9ebf99c'),
                ('6a9356cc-95d6-4662-b8f4-951ce17241a5', default, default, default, 'Cramps', 'f4209131-9408-4b08-89b3-033ad9ebf99c'),
                ('fe270b38-b809-40e7-85a3-2be483b8a838', default, default, default, 'Bloating', 'f4209131-9408-4b08-89b3-033ad9ebf99c'),
                ('ff8529f3-134c-4990-8cc5-3f8ae83d9202', default, default, default, 'Constipation', 'f4209131-9408-4b08-89b3-033ad9ebf99c'),
                ('833cfbd0-4ce4-4551-8bb1-0bdbdb8dd3c2', default, default, default, 'Hunger', 'f4209131-9408-4b08-89b3-033ad9ebf99c'),
                ('e3716977-7def-4395-ad9e-c5d2de4cea00', default, default, default, 'Cravings', 'f4209131-9408-4b08-89b3-033ad9ebf99c'),
                ('7a2708da-f7e3-4541-8439-df1eade7ba96', default, default, default, 'Muscle pain', 'f4209131-9408-4b08-89b3-033ad9ebf99c'),
                ('7c0933ff-e6f0-4740-9c8d-9dc89f3c9c94', default, default, default, 'Exhausted', '9c6d71a1-961a-4155-b842-146c82c1e8a9'),
                ('8f8fe73d-ed61-4acb-9f34-9b28eb5bd77c', default, default, default, 'Stressed', '9c6d71a1-961a-4155-b842-146c82c1e8a9'),
                ('7c520941-243b-47f2-837c-737e687327a3', default, default, default, 'Angry', '9c6d71a1-961a-4155-b842-146c82c1e8a9'),
                ('ccdb8432-be9d-43d5-9124-9216f821f1b4', default, default, default, 'Frustrated', '9c6d71a1-961a-4155-b842-146c82c1e8a9'),
                ('ae2afcf0-2efd-4488-9255-57c8d33e7972', default, default, default, 'Neutral', '9c6d71a1-961a-4155-b842-146c82c1e8a9'),
                ('efa34b5c-e414-4dd7-8e6d-9fdb524a40ef', default, default, default, 'Energized', '9c6d71a1-961a-4155-b842-146c82c1e8a9'),
                ('cf1720a7-f58d-4a89-887a-0a1c430bf314', default, default, default, 'Happy', '9c6d71a1-961a-4155-b842-146c82c1e8a9'),
                ('530e991e-9a87-4c84-89cc-504b3a84685c', default, default, default, 'Yellow', '128b8c4e-72f1-4d44-9fd4-372e7c930a87'),
                ('3459cd51-a42b-4822-a722-65c202ca2add', default, default, default, 'Green', '128b8c4e-72f1-4d44-9fd4-372e7c930a87'),
                ('07e5a212-8c56-40bc-a314-79154611d5e5', default, default, default, 'White', '128b8c4e-72f1-4d44-9fd4-372e7c930a87'),
                ('58045639-1c52-4e0a-9b7e-71abf008f17b', default, default, default, 'Dry', '49bf5965-c012-4e91-9f6a-4b9cbb8fefc3'),
                ('e513a802-0190-428f-9273-ad9bd31f492c', default, default, default, 'Creamy', '49bf5965-c012-4e91-9f6a-4b9cbb8fefc3'),
                ('935a9250-35cb-491e-ac57-e8061177f152', default, default, default, 'Sticky', '49bf5965-c012-4e91-9f6a-4b9cbb8fefc3'),
                ('a10324c6-8bfc-4b87-98ff-67b618afb684', default, default, default, 'Watery', '49bf5965-c012-4e91-9f6a-4b9cbb8fefc3'),
                ('49490dbe-042c-4565-82b2-4bc8d57f5da4', default, default, default, 'Neutral', 'f5eb1061-c136-4c9c-89aa-dbbbb4f067df'),
                ('af2f9041-bc1d-487d-81a0-bd66b98a71b2', default, default, default, 'Copper', 'f5eb1061-c136-4c9c-89aa-dbbbb4f067df'),
                ('b5f8ff68-794d-4f8d-baf7-1e9789ff7749', default, default, default, 'Sweet', 'f5eb1061-c136-4c9c-89aa-dbbbb4f067df'),
                ('edeac6cd-6fe1-4566-975d-ba5328d4a3d4', default, default, default, 'Fishy', 'f5eb1061-c136-4c9c-89aa-dbbbb4f067df'),
                ('10709605-9696-4ece-96ca-85f7589f74c8', default, default, default, 'Sour', 'f5eb1061-c136-4c9c-89aa-dbbbb4f067df');

                INSERT INTO "day" VALUES
                ('0a1f35fe-6b76-45d6-9b0c-c1092e5f4a28', default, default, default, '2022-11-10', '27700306-06aa-4bd1-a3f4-67570384b5e1', '935a9250-35cb-491e-ac57-e8061177f152'),
                ('6a9356cc-95d6-4662-b8f4-951ce17241a5', default, default, default, '2022-01-01', '27700306-06aa-4bd1-a3f4-67570384b5e1', '7c0933ff-e6f0-4740-9c8d-9dc89f3c9c94'),
                ('fe270b38-b809-40e7-85a3-2be483b8a838', default, default, default, '2022-01-02', '27700306-06aa-4bd1-a3f4-67570384b5e1', '8f8fe73d-ed61-4acb-9f34-9b28eb5bd77c'),
                ('2e2121ee-66a2-4c1a-b4fa-f269ab9abf08', default, default, default, '2022-01-02', '27700306-06aa-4bd1-a3f4-67570384b5e1', '7c0933ff-e6f0-4740-9c8d-9dc89f3c9c94'),
                ('d30c7cd3-2503-495e-ac93-30d0b2322f9b', default, default, default, '2022-12-20', '27700306-06aa-4bd1-a3f4-67570384b5e1', '7a2708da-f7e3-4541-8439-df1eade7ba96'),
                ('bd3c7ede-572a-4502-8b89-0711a098b809', default, default, default, '2022-12-20', '27700306-06aa-4bd1-a3f4-67570384b5e1', '7c0933ff-e6f0-4740-9c8d-9dc89f3c9c94'),
                ('99995040-7717-493d-8749-0b89e997eea6', default, default, default, '2022-12-25', '27700306-06aa-4bd1-a3f4-67570384b5e1', '10709605-9696-4ece-96ca-85f7589f74c8');

                INSERT INTO "menstrual_cycle" VALUES
                ('1a1f35fe-6b76-45d6-9b0c-c1092e5f4a28', default, default, default, 28, 3, 14, '2022-06-21', '2022-06-23', '2022-07-05', '27700306-06aa-4bd1-a3f4-67570384b5e1'),
                ('2a1f35fe-6b76-45d6-9b0c-c1092e5f4a28', default, default, default, 26, 3, 14, '2022-07-19', '2022-07-21', '2022-07-31', '27700306-06aa-4bd1-a3f4-67570384b5e1'),
                ('3a1f35fe-6b76-45d6-9b0c-c1092e5f4a28', default, default, default, 29, 3, 14, '2022-08-14', '2022-08-16', '2022-08-29', '27700306-06aa-4bd1-a3f4-67570384b5e1'),
                ('4a1f35fe-6b76-45d6-9b0c-c1092e5f4a28', default, default, default, 29, 3, 14, '2022-09-12', '2022-09-14', '2022-09-27', '27700306-06aa-4bd1-a3f4-67570384b5e1'),
                ('5a1f35fe-6b76-45d6-9b0c-c1092e5f4a28', default, default, default, 26, 3, 14, '2022-10-11', '2022-10-13', '2022-10-23', '27700306-06aa-4bd1-a3f4-67570384b5e1'),
                ('6a1f35fe-6b76-45d6-9b0c-c1092e5f4a28', default, default, default, 30, 3, 14, '2022-11-06', '2022-11-08', '2022-11-22', '27700306-06aa-4bd1-a3f4-67570384b5e1'),
                ('7a1f35fe-6b76-45d6-9b0c-c1092e5f4a28', default, default, default, 28, 3, 14, '2022-12-06', '2022-12-08', '2022-12-20', '27700306-06aa-4bd1-a3f4-67570384b5e1');

                INSERT INTO "medical_exam" VALUES
                ('f4209131-9408-4b08-89b3-033ad9ebf99c', default, default, default, '2022-09-12', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',  'dceb1b3e-917f-4adc-b894-a84ef856d90f', '27700306-06aa-4bd1-a3f4-67570384b5e1'),
                ('9c6d71a1-961a-4155-b842-146c82c1e8a9', default, default, default, '2022-12-12', 'All good.', NULL, '27700306-06aa-4bd1-a3f4-67570384b5e1'),
                ('128b8c4e-72f1-4d44-9fd4-372e7c930a87', default, default, default, '2022-10-12', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', '0a1f35fe-6b76-45d6-9b0c-c1092e5f4a28', '27700306-06aa-4bd1-a3f4-67570384b5e1');

            `
		);
	}

	down(): Promise<void> 
	{
		throw new Error( 'Method not implemented.' );
	}
}
