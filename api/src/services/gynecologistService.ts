import { Gynecologist } from '../model/entity/Gynecologist';
// import { User } from 'src/model/entity/User';
import { GynecologistRepository } from '../dao/gynecologistRepository';
import * as userService from '../services/userService';
import { AuthRequest } from '../model/request/AuthRequest';
import { AppError } from '../model/constants/AppError';
import { GynecologistRequest } from '../model/request/GynecologistRequest';

export const getGynecologist = async ( req: AuthRequest ): Promise<Gynecologist[]> => 
{
	try
	{
		return await GynecologistRepository.find( {
			where: [{ user: { id: req.userData.id } }],
		} );
	}
	catch
	{
		throw new AppError( 'Internal Server Error', 500 );
	}
};

export const insertGynecologist = async ( req: AuthRequest ) => 
{
	const user = await userService.getUserbyId( req.userData.id );
	if ( !user ) 
	{
		throw new AppError ( 'Unauthorized', 401 );
	}
	let gynecologist: Gynecologist;
	try
	{
		gynecologist = await GynecologistRequest.toEntity( req.body as GynecologistRequest, user );
		await GynecologistRepository.save( gynecologist );
	}
	catch ( error )
	{
		throw new AppError ( 'Bad request', 400 );
	}
};

export const getGynecologistbyId = async ( id: string ) => 
{
	try
	{
		return await GynecologistRepository.findOne( { where: { id: id } } );
	}
	catch
	{
		throw new AppError( 'Internal Server Error', 500 );
	}
};

export const deleteGynecologist = async ( id: string ) => 
{
	try
	{
		await GynecologistRepository.delete( id );
	}
	catch
	{
		throw new AppError( 'Internal Server Error', 500 );
	}
};
