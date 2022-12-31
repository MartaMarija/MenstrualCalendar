import * as EmailValidator from "email-validator";
import { UserRepository } from "../dao/userRepository";

export const getUserbyEmail = async (email: string) => {
  if (EmailValidator.validate(email)) {
    return UserRepository.findOne({ where: { email: email } });
  }
  return null;
};
