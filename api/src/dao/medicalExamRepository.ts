import { AppDataSource } from '../db/entrypoint/db_connection';
import { MedicalExam } from '../model/entity/MedicalExam';

export const MedicalExamRepository = AppDataSource.getRepository(MedicalExam);
