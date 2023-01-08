import { AppDataSource } from "../db/entrypoint/db_connection";
import { Gynecologist } from "../model/entity/Gynecologist";

export const GynecologistRepository = AppDataSource.getRepository(Gynecologist);
