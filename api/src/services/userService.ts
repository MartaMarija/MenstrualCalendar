import { User } from '../model/entity/User';
import { UserRepository } from '../dao/userRepository';
import { AppError } from '../model/constants/AppError';

export const getUserbyId = async ( id: string ) => 
{
	try
	{
		return UserRepository.findOne( { where: { id: id } } );	
	}
	catch
	{
		throw new AppError( 'Internal Server Error', 500 );
	}
};

export const getUserbyEmail = async ( email: string ) => 
{
	try
	{
		return await UserRepository.findOne( { where: { email: email } } );
	}
	catch
	{
		throw new AppError( 'Internal Server Error', 500 );
	}
};

export const saveUser = async ( user : User ) => 
{
	try
	{
		await UserRepository.save( user );
	}
	catch
	{
		throw new AppError( 'Internal Server Error', 500 );
	}
};

export const getMenstrualCycleInfoFromUser = async ( id: string ) => 
{
	try
	{
		return await UserRepository.findOne( {
			select: {
				avg_duration_of_menstrual_cycle: true,
				avg_duration_of_menstruation: true,
				avg_duration_of_luteal_phase: true,
			},
			where: { id: id },
		} );
	}
	catch
	{
		throw new AppError( 'Internal Server Error', 500 );
	}
};

export const getRefreshTokenFromUser = async ( id: string ) => 
{
	try
	{
		return await UserRepository.findOne( {
			select: {
				refresh_token: true
			},
			where: { id: id },
		} );
	}
	catch
	{
		throw new AppError( 'Internal Server Error', 500 );
	}
	
};
