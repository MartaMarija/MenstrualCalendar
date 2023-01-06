import { MenstrualCycle } from "src/model/entity/MenstrualCycle";
import { Equal } from "typeorm";
import { MenstrualCycleRepository } from "../dao/menstrualCycleRepository";

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
  let menstrualCycleList: Promise<MenstrualCycle[]> =
    MenstrualCycleRepository.find({
      select: {
        cycle_start_date: true,
      },
      where: { user: { id: id }, cycle_start_date: Equal(date) },
    });
  if ((await menstrualCycleList).length == 1) {
    return true;
  }
  return false;
};

export const canEndPeriod = async (
  id: string,
  date: Date
): Promise<boolean> => {
  const lastCycle = await MenstrualCycleRepository.createQueryBuilder("mc")
    .select("mc.cycle_start_date")
    .where("mc.user.id = :userId", { userId: id })
    .orderBy("mc.cycle_start_date", "DESC")
    .getOne();
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
  const lastCycle = await MenstrualCycleRepository.createQueryBuilder("mc")
    .select("mc.cycle_start_date")
    .where("mc.user.id = :userId", { userId: id })
    .orderBy("mc.cycle_start_date", "DESC")
    .getOne();
  if (lastCycle != null) {
    const lastCycleDate = new Date(lastCycle.cycle_start_date);
    lastCycleDate.setDate(lastCycleDate.getDate() + 10);
    if (date >= lastCycleDate) return true;
  }
  return false;
};

// export const makeDatesAndProps = (menstrualCycles: MenstrualCycle[]) => {
//   let days = [];
//   menstrualCycles.forEach((menstrualCycle) => {});
// };
