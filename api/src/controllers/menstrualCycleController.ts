import express from 'express';
import { AuthRequest } from 'src/model/request/AuthRequest';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../model/constants/AppError';
import * as menstrualCycleService from '../services/menstrualCycleService';
import { authenticateUser } from '../auth/authenticateUser';
import { MenstrualCycleDatesResponse } from '../model/response/MenstrualCyclesDates';
const router = express.Router();

router.use( authenticateUser );

router.get( '/', async ( req: Request, res: Response, next: NextFunction ) => 
{
	let menstrualCycleDatesResponse;
	try
	{
		const menstrualCycles = await menstrualCycleService.getMenstrualCycles(  req as AuthRequest );
		menstrualCycleDatesResponse = MenstrualCycleDatesResponse.toDtos( menstrualCycles );
		menstrualCycleDatesResponse.push( await menstrualCycleService.calculateNextCycleDates( req as AuthRequest, menstrualCycles[0].cycle_start_date ) );
	}
	catch ( error )
	{
		return next( new AppError( error.message, error.code ) );
	}
	res.json( menstrualCycleDatesResponse );
} );

// router.delete( '/:date',
// 	async ( req: Request, res: Response, next: NextFunction ) => 
// 	{
// 		const jwt = jwtService.authenticateToken( req );
// 		if ( jwt ) 
// 		{
// 			return res.json( await menstrualCycleService.RemovePeriod( jwt.id ) );
// 		}
// 		return next( new AppError( 'Invalid token!', 400 ) );
// 	}
// );

// router.patch(
// 	'/endPeriod/:date',
// 	async ( req: Request, res: Response, next: NextFunction ) => 
// 	{
// 		const jwt = jwtService.authenticateToken( req );
// 		if ( jwt ) 
// 		{
// 			return res.json(
// 				await menstrualCycleService.EndPeriod( jwt.id, new Date( req.params.date ) )
// 			);
// 		}
// 		return next( new AppError( 'Invalid token!', 400 ) );
// 	}
// );

// router.post( '/:date',
// 	async ( req: Request, res: Response, next: NextFunction ) => 
// 	{
// 		const jwt = jwtService.authenticateToken( req );
// 		if ( jwt ) 
// 		{
// 			return res.json(
// 				await menstrualCycleService.AddPeriod( jwt.id, new Date( req.params.date ) )
// 			);
// 		}
// 		return next( new AppError( 'Invalid token!', 400 ) );
// 	}
// );

export default router;
