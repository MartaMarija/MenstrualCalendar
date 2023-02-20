import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { Gynecologist } from '../model/entity/Gynecologist';
import { AppError } from '../model/constants/AppError';
import * as gynecologistService from '../services/gynecologistService';
import * as jwtService from '../services/jwtService';
const router = express.Router();

router.get( '/', async ( req: Request, res: Response, next: NextFunction ) => 
{
	const jwt = jwtService.authenticateToken( req );
	if ( jwt ) 
	{
		return res.json( await gynecologistService.getGynecologist( jwt.id ) );
	}
	return next( new AppError( 'Invalid token!', 400 ) );
} );

router.post(
	'/addGyn',
	async ( req: Request, res: Response, next: NextFunction ) => 
	{
		const jwt = jwtService.authenticateToken( req );
		if ( jwt ) 
		{
			const gyn: Gynecologist = new Gynecologist();
			gyn.first_name = req.body.firstName;
			gyn.last_name = req.body.lastName;
			gyn.address = req.body.address;
			gyn.telephone = req.body.telephone;
			return res.json(
				await gynecologistService.insertGynecologist( jwt.id, gyn )
			);
		}
		return next( new AppError( 'Invalid token!', 400 ) );
	}
);

router.get(
	'/removeGyn/:gynId',
	async ( req: Request, res: Response, next: NextFunction ) => 
	{
		const jwt = jwtService.authenticateToken( req );
		if ( jwt ) 
		{
			return res.json(
				await gynecologistService.deleteGynecologist( req.params.gynId )
			);
		}
		return next( new AppError( 'Invalid token!', 400 ) );
	}
);

export default router;
