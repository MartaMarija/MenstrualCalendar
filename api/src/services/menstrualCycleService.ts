import { MenstrualCycle } from "../model/entity/MenstrualCycle";
import { User } from "src/model/entity/User";
import { MenstrualCycleRepository } from "../dao/menstrualCycleRepository";
import * as userService from "../services/userService";

export const getMenstrualCycleByUserId = async (
  id: string
): Promise<MenstrualCycle[] | null> => {
  return MenstrualCycleRepository.find({
    select: {
      id: true,
      cycle_duration: true,
      menstruation_duration: true,
      luteal_phase_duration: true,
      cycle_start_date: true,
      menstruation_end_date: true,
      ovulation_date: true,
    },
    where: [
      { user: { id: id } },
      // { cycle_start_date: Between(beginning, end) },
    ],
  });
};

export const canRemovePeriod = async (
  id: string,
  date: Date
): Promise<boolean> => {
  const lastCycle = await getLastCycleStartDate(id);
  if (lastCycle != null) {
    const newDate = new Date(lastCycle.cycle_start_date);
    if (newDate.toString() == date.toString()) {
      return true;
    }
  }
  return false;
};

export const canEndPeriod = async (
  id: string,
  date: Date
): Promise<boolean> => {
  const lastCycle = await getLastCycleStartDate(id);
  if (lastCycle != null) {
    const lastCycleDate = new Date(lastCycle.cycle_start_date);
    const pomDate = new Date(lastCycleDate);
    lastCycleDate.setDate(lastCycleDate.getDate() + 12);
    if (date >= pomDate && date <= lastCycleDate) return true;
  }
  return false;
};

export const canAddPeriod = async (
  id: string,
  date: Date
): Promise<boolean> => {
  const lastCycle = await getLastCycleStartDate(id);
  if (lastCycle != null) {
    const lastCycleDate = new Date(lastCycle.cycle_start_date);
    lastCycleDate.setDate(lastCycleDate.getDate() + 10);
    if (date >= lastCycleDate) return true;
  }
  return false;
};

export const RemovePeriod = async (id: string): Promise<boolean> => {
  const menstrualCycle: MenstrualCycle | null = await getLastCycleId(id);
  if (menstrualCycle != null) {
    MenstrualCycleRepository.delete(menstrualCycle.id);
    return true;
  }
  return false;
};

export const EndPeriod = async (id: string, date: Date): Promise<boolean> => {
  const menstrualCycle: MenstrualCycle | null = await getLastCycleId(id);
  if (menstrualCycle != null) {
    const menstrualCyclePom = new MenstrualCycle();
    menstrualCyclePom.id = menstrualCycle.id;
    menstrualCyclePom.menstruation_end_date = date;
    MenstrualCycleRepository.save(menstrualCyclePom);
    return true;
  }
  return false;
};

export const AddPeriod = async (id: string, date: Date): Promise<boolean> => {
  const user: User | null = await userService.getUserbyId(id);
  if (user != null) {
    const menstrualCycle = new MenstrualCycle();
    menstrualCycle.cycle_start_date = date;
    menstrualCycle.user = user;
    MenstrualCycleRepository.save(menstrualCycle);
    return true;
  }
  return false;
};

async function getLastCycleId(id: string) {
  return await MenstrualCycleRepository.createQueryBuilder("mc")
    .select("mc.id")
    .where("mc.user.id = :userId", { userId: id })
    .orderBy("mc.cycle_start_date", "DESC")
    .getOne();
}

async function getLastCycleStartDate(id: string) {
  return await MenstrualCycleRepository.createQueryBuilder("mc")
    .select("mc.cycle_start_date")
    .where("mc.user.id = :userId", { userId: id })
    .orderBy("mc.cycle_start_date", "DESC")
    .getOne();
}