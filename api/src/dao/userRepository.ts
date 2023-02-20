import { AppDataSource } from '../db/entrypoint/db_connection';
import { User } from '../model/entity/User';

export const UserRepository = AppDataSource.getRepository( User );
