import { AppDataSource } from "../db/entrypoint/db_connection";
import { MenstrualCycle } from "../model/entity/MenstrualCycle";

export const MenstrualCycleRepository =
  AppDataSource.getRepository(MenstrualCycle);
