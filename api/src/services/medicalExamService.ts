import { MedicalExam } from "../model/entity/MedicalExam";
import { User } from "src/model/entity/User";
import { MedicalExamRepository } from "../dao/medicalExamRepository";
import * as userService from "../services/userService";

export const getMedicalExams = async (id: string): Promise<MedicalExam[]> => {
    return await MedicalExamRepository.createQueryBuilder("medicalExam")
    .leftJoinAndSelect("medicalExam.gynecologist", "gynecologist")
    .where("medicalExam.user.id = :userId", { userId: id })
    .orderBy("date", "DESC")
    .getMany();
};
