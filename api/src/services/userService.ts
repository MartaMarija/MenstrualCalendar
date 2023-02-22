// import * as EmailValidator from 'email-validator';
// import { AppError } from '../model/constants/AppError';
import { User } from '../model/entity/User';
import { UserRepository } from '../dao/userRepository';

export const getUserbyId = async ( id: string ) => 
{
	return UserRepository.findOne( { where: { id: id } } );
};

export const getUserbyEmail = async ( email: string ) => 
{
	return await UserRepository.findOne( { where: { email: email } } );
};

export const saveUser = async ( user : User ) => 
{
	return UserRepository.save( user );
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

export const getRefreshTokenFromUser = async (
	id: string
): Promise<User | null> => 
{
	return UserRepository.findOne( {
		select: {
			refresh_token: true
		},
		where: { id: id },
	} );
};
