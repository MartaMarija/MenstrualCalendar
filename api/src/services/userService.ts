// import * as EmailValidator from 'email-validator';
// import { AppError } from '../model/constants/AppError';
import { User } from '../model/entity/User';
import { UserRepository } from '../dao/userRepository';

export const getUserbyId = async ( id: string ) => 
{
	return UserRepository.findOne( { where: { id: id } } );
};

export const getMenstrualCycleInfoFromUser = async (
	id: string
): Promise<User | null> => 
{
	return UserRepository.findOne( {
		select: {
			avg_duration_of_menstrual_cycle: true,
			avg_duration_of_menstruation: true,
			avg_duration_of_luteal_phase: true,
		},
		where: { id: id },
	} );
};
