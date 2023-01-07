import { Gynecologist } from "../model/entity/Gynecologist";
import { User } from "src/model/entity/User";
import { GynecologistRepository } from "../dao/gynecologistRepository";
import * as userService from "../services/userService";

export const getGynecologist = async (id: string): Promise<Gynecologist[]> => {
  return await GynecologistRepository.find({
    where: [{ user: { id: id } }],
  });
};

export const insertGynecologist = async (id: string, gyn: Gynecologist) => {
  const user: User | null = await userService.getUserbyId(id);
  if (user != null) {
    gyn.user = user;
    return await GynecologistRepository.save(gyn);
  }
  return false;
};
