import { MenstrualCycle } from "../model/entity/MenstrualCycle";
import { User } from "src/model/entity/User";
import { MenstrualCycleRepository } from "../dao/menstrualCycleRepository";
import * as userService from "../services/userService";
import { DateSettings } from "../model/response/DateSettings";
import { Between } from "typeorm";

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

export const getDates = async (
  id: string,
  beginning: Date,
  end: Date
): Promise<DateSettings[]> => {
  const menstrualCycles: MenstrualCycle[] = await MenstrualCycleRepository.find(
    {
      select: {
        cycle_start_date: true,
        menstruation_end_date: true,
        ovulation_date: true,
      },
      where: [
        { user: { id: id }, cycle_start_date: Between(beginning, end) },
        { user: { id: id }, menstruation_end_date: Between(beginning, end) },
        { user: { id: id }, ovulation_date: Between(beginning, end) },
      ],
    }
  );

  let dates: DateSettings[] = [];
  menstrualCycles.forEach((cycle) => {
    let cycleStartDay = new Date(cycle.cycle_start_date);
    if (cycleStartDay >= beginning && cycleStartDay < end) {
      let _cycleStartDate: string = fromDataToString(cycleStartDay);
      dates.push(
        new DateSettings(_cycleStartDate, "red", "white", true, false)
      );
    }

    let menstruationEndDate = new Date(cycle.menstruation_end_date);
    if (menstruationEndDate >= beginning && menstruationEndDate < end) {
      let _menstruationEndDate: string = fromDataToString(menstruationEndDate);
      dates.push(
        new DateSettings(_menstruationEndDate, "red", "white", false, true)
      );
    }

    let ovulationDate = new Date(cycle.ovulation_date);
    if (ovulationDate >= beginning && ovulationDate < end) {
      let _ovulationDate: string = fromDataToString(ovulationDate);
      dates.push(
        new DateSettings(_ovulationDate, "#F564A9", "white", true, true)
      );
    }

    const dateBetween = new Date(cycle.cycle_start_date);
    dateBetween.setDate(dateBetween.getDate() + 1);
    while (dateBetween < menstruationEndDate) {
      if (dateBetween >= beginning && dateBetween < end) {
        let _dateBetween: string = fromDataToString(dateBetween);
        dates.push(
          new DateSettings(_dateBetween, "red", "white", false, false)
        );
      }
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
