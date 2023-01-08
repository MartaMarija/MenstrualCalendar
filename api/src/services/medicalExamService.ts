import { MedicalExam } from "../model/entity/MedicalExam";
import { User } from "../model/entity/User";
import { MedicalExamRepository } from "../dao/medicalExamRepository";
import * as userService from "../services/userService";
import { Gynecologist } from "../model/entity/Gynecologist";
import * as gynecologistService from "./gynecologistService";

export const getMedicalExams = async (id: string): Promise<MedicalExam[]> => {
  return await MedicalExamRepository.createQueryBuilder("medicalExam")
    .leftJoinAndSelect("medicalExam.gynecologist", "gynecologist")
    .where("medicalExam.user.id = :userId", { userId: id })
    .orderBy("date", "DESC")
    .getMany();
};

export const insertMedicalExam = async (
  id: string,
  medicalExam: MedicalExam,
  gynId: string
) => {
  const user: User | null = await userService.getUserbyId(id);
  const gyn: Gynecologist | null = await gynecologistService.getGynecologistbyId(gynId);
  if (user != null) {
    medicalExam.user = user;
    medicalExam.gynecologist = gyn;
    await MedicalExamRepository.save(medicalExam);
    return true;
  }
  return false;
};
