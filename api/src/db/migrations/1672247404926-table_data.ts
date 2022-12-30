import { MigrationInterface, QueryRunner } from "typeorm"

export class tableData1672247404926 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const schemaName: string = process.env.DB_SCHEMA || 'mencal';

        await queryRunner.query(`set schema '${schemaName}';`);

        await queryRunner.query(
            `
                INSERT INTO "user" VALUES
                ('27700306-06aa-4bd1-a3f4-67570384b5e1', 'Ana', 'Anić', 'ana@gmail.com', 'pass', 28, 4),
                ('0ff0abcf-519c-4d47-b0f2-f65079284120', 'Jana', 'Janić', 'jana@gmail.com', 'pass', 31, 5),
                ('1cfd14e8-cbb1-40a3-a892-a4f8a185f024', 'Lana', 'Lanić', 'lana@gmail.com', 'pass', 27, 6);

                INSERT INTO "gynecologist" VALUES
                ('dceb1b3e-917f-4adc-b894-a84ef856d90f', 'Dom zdravlja', 'Fiona Horvat', '021/600-600', 'Zagrebačka ulica 3, 10000 Zagreb', '27700306-06aa-4bd1-a3f4-67570384b5e1'),
                ('d9d38929-4228-4ce8-82b3-3cb2ee651d10', '', 'Goran Anić', '021/700-600', 'Splićanska ulica 3, 21000 Split', '0ff0abcf-519c-4d47-b0f2-f65079284120'),
                ('0a1f35fe-6b76-45d6-9b0c-c1092e5f4a28', 'Poliklinika Gyn', 'Korana Rić', '021/540-640', 'Varaždinska ulica 3, 42000 Varaždin', '27700306-06aa-4bd1-a3f4-67570384b5e1');
            
                INSERT INTO "description_type" VALUES
                ('f4209131-9408-4b08-89b3-033ad9ebf99c', 'Symptom'),
                ('9c6d71a1-961a-4155-b842-146c82c1e8a9', 'Mood'),
                ('128b8c4e-72f1-4d44-9fd4-372e7c930a87', 'Discharge - color'),
                ('f5eb1061-c136-4c9c-89aa-dbbbb4f067df', 'Discharge - smell'),
                ('49bf5965-c012-4e91-9f6a-4b9cbb8fefc3', 'Discharge - texture');

                INSERT INTO "description" VALUES
                ('0a1f35fe-6b76-45d6-9b0c-c1092e5f4a28', 'Headache', 'f4209131-9408-4b08-89b3-033ad9ebf99c'),
                ('6a9356cc-95d6-4662-b8f4-951ce17241a5', 'Cramps', 'f4209131-9408-4b08-89b3-033ad9ebf99c'),
                ('fe270b38-b809-40e7-85a3-2be483b8a838', 'Bloating', 'f4209131-9408-4b08-89b3-033ad9ebf99c'),
                ('ff8529f3-134c-4990-8cc5-3f8ae83d9202', 'Constipation', 'f4209131-9408-4b08-89b3-033ad9ebf99c'),
                ('833cfbd0-4ce4-4551-8bb1-0bdbdb8dd3c2', 'Hunger', 'f4209131-9408-4b08-89b3-033ad9ebf99c'),
                ('e3716977-7def-4395-ad9e-c5d2de4cea00', 'Cravings', 'f4209131-9408-4b08-89b3-033ad9ebf99c'),
                ('7a2708da-f7e3-4541-8439-df1eade7ba96', 'Muscle pain', 'f4209131-9408-4b08-89b3-033ad9ebf99c'),
                ('7c0933ff-e6f0-4740-9c8d-9dc89f3c9c94', 'Exhausted', '9c6d71a1-961a-4155-b842-146c82c1e8a9'),
                ('8f8fe73d-ed61-4acb-9f34-9b28eb5bd77c', 'Stressed', '9c6d71a1-961a-4155-b842-146c82c1e8a9'),
                ('7c520941-243b-47f2-837c-737e687327a3', 'Angry', '9c6d71a1-961a-4155-b842-146c82c1e8a9'),
                ('ccdb8432-be9d-43d5-9124-9216f821f1b4', 'Frustrated', '9c6d71a1-961a-4155-b842-146c82c1e8a9'),
                ('ae2afcf0-2efd-4488-9255-57c8d33e7972', 'Neutral', '9c6d71a1-961a-4155-b842-146c82c1e8a9'),
                ('efa34b5c-e414-4dd7-8e6d-9fdb524a40ef', 'Energized', '9c6d71a1-961a-4155-b842-146c82c1e8a9'),
                ('cf1720a7-f58d-4a89-887a-0a1c430bf314', 'Happy', '9c6d71a1-961a-4155-b842-146c82c1e8a9'),
                ('530e991e-9a87-4c84-89cc-504b3a84685c', 'Yellow', '128b8c4e-72f1-4d44-9fd4-372e7c930a87'),
                ('3459cd51-a42b-4822-a722-65c202ca2add', 'Green', '128b8c4e-72f1-4d44-9fd4-372e7c930a87'),
                ('07e5a212-8c56-40bc-a314-79154611d5e5', 'White', '128b8c4e-72f1-4d44-9fd4-372e7c930a87'),
                ('58045639-1c52-4e0a-9b7e-71abf008f17b', 'Dry', '49bf5965-c012-4e91-9f6a-4b9cbb8fefc3'),
                ('e513a802-0190-428f-9273-ad9bd31f492c', 'Creamy', '49bf5965-c012-4e91-9f6a-4b9cbb8fefc3'),
                ('935a9250-35cb-491e-ac57-e8061177f152', 'Sticky', '49bf5965-c012-4e91-9f6a-4b9cbb8fefc3'),
                ('a10324c6-8bfc-4b87-98ff-67b618afb684', 'Watery', '49bf5965-c012-4e91-9f6a-4b9cbb8fefc3'),
                ('49490dbe-042c-4565-82b2-4bc8d57f5da4', 'Neutral', 'f5eb1061-c136-4c9c-89aa-dbbbb4f067df'),
                ('af2f9041-bc1d-487d-81a0-bd66b98a71b2', 'Copper', 'f5eb1061-c136-4c9c-89aa-dbbbb4f067df'),
                ('b5f8ff68-794d-4f8d-baf7-1e9789ff7749', 'Sweet', 'f5eb1061-c136-4c9c-89aa-dbbbb4f067df'),
                ('edeac6cd-6fe1-4566-975d-ba5328d4a3d4', 'Fishy', 'f5eb1061-c136-4c9c-89aa-dbbbb4f067df'),
                ('10709605-9696-4ece-96ca-85f7589f74c8', 'Sour', 'f5eb1061-c136-4c9c-89aa-dbbbb4f067df');

                INSERT INTO "day" VALUES
                ('2022-11-10', '27700306-06aa-4bd1-a3f4-67570384b5e1', '935a9250-35cb-491e-ac57-e8061177f152'),
                ('2022-01-01', '27700306-06aa-4bd1-a3f4-67570384b5e1', '7c0933ff-e6f0-4740-9c8d-9dc89f3c9c94'),
                ('2022-01-02', '27700306-06aa-4bd1-a3f4-67570384b5e1', '8f8fe73d-ed61-4acb-9f34-9b28eb5bd77c'),
                ('2022-01-02', '27700306-06aa-4bd1-a3f4-67570384b5e1', '7c0933ff-e6f0-4740-9c8d-9dc89f3c9c94'),
                ('2022-12-20', '27700306-06aa-4bd1-a3f4-67570384b5e1', '7a2708da-f7e3-4541-8439-df1eade7ba96'),
                ('2022-12-20', '27700306-06aa-4bd1-a3f4-67570384b5e1', '7c0933ff-e6f0-4740-9c8d-9dc89f3c9c94'),
                ('2022-12-25', '27700306-06aa-4bd1-a3f4-67570384b5e1', '10709605-9696-4ece-96ca-85f7589f74c8');

                INSERT INTO "menstrual_cycle" VALUES
                ('0a1f35fe-6b76-45d6-9b0c-c1092e5f4a28', 29, 3, 14, '2022-09-12', '27700306-06aa-4bd1-a3f4-67570384b5e1'),
                ('6a9356cc-95d6-4662-b8f4-951ce17241a5', 26, 3, 14, '2022-10-11', '27700306-06aa-4bd1-a3f4-67570384b5e1'),
                ('fe270b38-b809-40e7-85a3-2be483b8a838', NULL, NULL, NULL, '2022-11-06', '27700306-06aa-4bd1-a3f4-67570384b5e1');


                INSERT INTO "medical_exam" VALUES
                ('f4209131-9408-4b08-89b3-033ad9ebf99c', '2022-09-12', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',  'dceb1b3e-917f-4adc-b894-a84ef856d90f', '27700306-06aa-4bd1-a3f4-67570384b5e1'),
                ('9c6d71a1-961a-4155-b842-146c82c1e8a9', '2022-12-12', 'All good.', NULL, '27700306-06aa-4bd1-a3f4-67570384b5e1'),
                ('128b8c4e-72f1-4d44-9fd4-372e7c930a87', '2022-10-12', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', '0a1f35fe-6b76-45d6-9b0c-c1092e5f4a28', '27700306-06aa-4bd1-a3f4-67570384b5e1');

            `
        );
    }

    down(): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
