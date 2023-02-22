import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../model/constants/AppError';
import * as authService from '../services/authService';
const router = express.Router();

router.post( '/login', async ( req: Request, res: Response, next: NextFunction ) => 
{
	let loginResponse;
	try
	{
		loginResponse = await authService.loginUser( req );
	}
	catch ( error )
	{
		const errorMessage = ( error instanceof AppError ) ? error.message : 'Unauthorized';		
		const errorCode = ( error instanceof AppError ) ? error.code : 401;	
		return next( new AppError( errorMessage, errorCode ) );
	}
	res.json( loginResponse );
} );

router.post( '/refresh', async ( req: Request, res: Response, next: NextFunction ) => 
{
	let refreshResponse;
	try
	{
		refreshResponse = await authService.refreshToken( req );
	}
	catch ( error )
	{
		return next( new AppError( error.message, error.code ) );
	}
	res.json( refreshResponse );
} );

//TODO /logout

export default router;
