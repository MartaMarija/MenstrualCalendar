import * as EmailValidator from 'email-validator';
import { User } from 'src/model/entity/User';
import { UserRepository } from '../dao/userRepository';

export const getUserbyEmail = async (email: string) => 
{
	if (EmailValidator.validate(email)) 
	{
		return UserRepository.findOne({ where: { email: email } });
	}
	return null;
};

export const getUserbyId = async (id: string) => 
{
	return UserRepository.findOne({ where: { id: id } });
};

export const getMenstrualCycleInfoFromUser = async (
	id: string
): Promise<User | null> => 
{
	return UserRepository.findOne({
		select: {
			avg_duration_of_menstrual_cycle: true,
			avg_duration_of_menstruation: true,
			avg_duration_of_luteal_phase: true,
		},
		where: { id: id },
	});
};
