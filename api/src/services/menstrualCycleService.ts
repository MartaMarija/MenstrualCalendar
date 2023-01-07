import { MenstrualCycle } from "../model/entity/MenstrualCycle";
import { User } from "src/model/entity/User";
import { MenstrualCycleRepository } from "../dao/menstrualCycleRepository";
import * as userService from "../services/userService";
import { DateSettings } from "../model/response/DateSettings";

export const getDates = async (id: string): Promise<DateSettings[]> => {
  const menstrualCycles: MenstrualCycle[] = await MenstrualCycleRepository.find(
    {
      select: {
        cycle_start_date: true,
        menstruation_end_date: true,
        ovulation_date: true,
      },
      where: [{ user: { id: id } }],
    }
  );

  let dates: DateSettings[] = [];
  menstrualCycles.forEach((cycle) => {
    let cycleStartDay: string = fromDataToString(
      new Date(cycle.cycle_start_date)
    );
    dates.push(new DateSettings(cycleStartDay, "red", "white", true, false));

    let menstruationEndDate: string = fromDataToString(
      new Date(cycle.menstruation_end_date)
    );
    dates.push(
      new DateSettings(menstruationEndDate, "red", "white", false, true)
    );

    let ovulationDate: string = fromDataToString(
      new Date(cycle.ovulation_date)
    );
    dates.push(new DateSettings(ovulationDate, "#F564A9", "white", true, true));

    const dateBetween = new Date(cycle.cycle_start_date);
    dateBetween.setDate(dateBetween.getDate() + 1);
    while (dateBetween < new Date(cycle.menstruation_end_date)) {
      let _dateBetween: string = fromDataToString(dateBetween);
      dates.push(new DateSettings(_dateBetween, "red", "white", false, false));
      dateBetween.setDate(dateBetween.getDate() + 1);
    }
  });
  return dates;
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
    const today = new Date();
    if (date >= lastCycleDate && date <= today) {
      return true;
    } else {
      return false;
    }
  }
  return true;
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
    const today = new Date();
    if (date <= today) {
      const menstrualCyclePom = new MenstrualCycle();
      menstrualCyclePom.id = menstrualCycle.id;
      menstrualCyclePom.menstruation_end_date = date;
      MenstrualCycleRepository.save(menstrualCyclePom);
      return true;
    }
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

function fromDataToString(date: Date) {
  let month = date.toLocaleDateString("en-US", { month: "2-digit" });
  let day = date.toLocaleDateString("en-US", { day: "2-digit" });
  return `${date.getFullYear()}-${month}-${day}`;
}

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
