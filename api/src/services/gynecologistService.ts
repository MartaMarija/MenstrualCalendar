import { Gynecologist } from '../model/entity/Gynecologist';
// import { User } from 'src/model/entity/User';
import { GynecologistRepository } from '../dao/gynecologistRepository';
import * as userService from '../services/userService';
import { AuthRequest } from '../model/request/AuthRequest';
import { AppError } from '../model/constants/AppError';
import { GynecologistCreateRequest } from '../model/request/GynecologistCreateRequest';

export const getGynecologists = async ( req: AuthRequest ): Promise<Gynecologist[]> => 
{
	return await GynecologistRepository.find( {
		where: [{ user: { id: req.userData.id } }],
	} ).catch( ()=>
	{
		throw new AppError( 'Internal Server Error', 500 );
	} );
};

export const insertGynecologist = async ( req: AuthRequest ) => 
{
	const user = await userService.getUserbyId( req.userData.id );
	if ( !user ) 
	{
		throw new AppError ( 'Unauthorized', 401 );
	}
	const gynecologist = await GynecologistCreateRequest.toEntity( req.body as GynecologistCreateRequest, user );
	await GynecologistRepository.save( gynecologist )
		.catch( () =>
		{
			throw new AppError( 'Internal Server Error', 500 );
		} );
};

export const getGynecologistbyId = async ( id: string ) => 
{
	return await GynecologistRepository.findOne( { where: { id: id } } )
		.catch( ()=>
		{
			throw new AppError( 'Internal Server Error', 500 );
		} );	
};

export const deleteGynecologist = async ( id: string ) => 
{
	const result = await GynecologistRepository.delete( id )
		.catch( () => 
		{
			throw new AppError( 'Internal Server Error', 500 );
		} );
	if ( result.affected === 0 ) 
	{
		throw new AppError( 'Gynecologist not found', 404 );
	}
};
