import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../model/constants/AppError';
import * as gynecologistService from '../services/gynecologistService';
import { authenticateUser } from '../auth/authenticateUser';
import { AuthRequest } from 'src/model/request/AuthRequest';
import { GynecologistResponse } from '../model/response/GynecologistResponse';
import { validationResult, check } from 'express-validator';

const router = express.Router();

router.use( authenticateUser );

router.get( '/', async ( req: Request, res: Response, next: NextFunction ) => 
{
	let gynecologists;
	try
	{
		gynecologists = await gynecologistService.getGynecologists( req as AuthRequest );
	}
	catch ( error )
	{
		return next( new AppError( error.message, error.code ) );
	}
	res.json( GynecologistResponse.toDtos( gynecologists ) );
} );

router.post( '/',
	[
		check( 'first_name' ).notEmpty()
	], 
	async ( req: Request, res: Response, next: NextFunction ) => 
	{
		const errors = validationResult( req );
		if ( !errors.isEmpty() ) 
		{
			return next( new AppError( 'Bad request', 400 ) );
		}
		try
		{
			await gynecologistService.insertGynecologist( req as AuthRequest );
		}
		catch ( error )
		{
			return next( new AppError( error.message, error.code ) );
		}
		res.status( 201 ).json( { message: 'Gynecologist added successfully!' } );
	}
);

router.delete( '/:gynId', async ( req: Request, res: Response, next: NextFunction ) => 
{
	try 
	{
		await gynecologistService.deleteGynecologist( req.params.gynId );
	}
	catch ( error )
	{
		return next( new AppError( error.message, error.code ) );
	}
	res.status( 204 ).json( { message: 'Gynecologist deleted successfully!' } );
}
);

export default router;
