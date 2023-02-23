import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../model/constants/AppError';
import * as gynecologistService from '../services/gynecologistService';
import { authenticateUser } from '../auth/authenticateUser';
import { AuthRequest } from 'src/model/request/AuthRequest';
import { GynecologistResponse } from '../model/response/GynecologistResponse';
const router = express.Router();

router.use( authenticateUser );

router.get( '/', async ( req: Request, res: Response, next: NextFunction ) => 
{
	let gynecologists;
	try
	{
		gynecologists = await gynecologistService.getGynecologist( req as AuthRequest );
	}
	catch ( error )
	{
		return next( new AppError( error.message, error.code ) );
	}
	res.json( GynecologistResponse.toDtos( gynecologists ) );
} );

router.post( '/addGyn', async ( req: Request, res: Response, next: NextFunction ) => 
{
	try
	{
		await gynecologistService.insertGynecologist( req as AuthRequest );
	}
	catch ( error )
	{
		return next( new AppError( error.message, error.code ) );
	}
	res.json( { message: 'Gynecologist added successfully!' } );
}
);

router.delete( '/removeGyn/:gynId', async ( req: Request, res: Response, next: NextFunction ) => 
{
	try 
	{
		await gynecologistService.deleteGynecologist( req.params.gynId );
	}
	catch ( error )
	{
		return next( new AppError( error.message, error.code ) );
	}
	res.json( { message: 'Gynecologist deleted successfully!' } );
}
);

export default router;
