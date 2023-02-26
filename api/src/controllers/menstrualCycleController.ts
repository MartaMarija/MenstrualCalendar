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

router.post( '/', async ( req: Request, res: Response, next: NextFunction ) => 
{
	try
	{
		await menstrualCycleService.insertMenstrualCycle( req as AuthRequest );
	}
	catch ( error )
	{
		return next( new AppError( error.message, error.code ) );
	}
	res.status( 201 ).json( { message: 'Menstrual Cycle added successfully!' } );
}
);

router.patch( '/endOfPeriod', async ( req: Request, res: Response, next: NextFunction ) => 
{
	try 
	{
		await menstrualCycleService.updateMenstrualCyclePeriodEndDate( req as AuthRequest );
	}
	catch ( error )
	{
		return next( new AppError( error.message, error.code ) );
	}
	res.json( { message: 'Menstrual Cycle updated successfully!' } );
}
);

router.delete( '/lastMenstrualCycle', async ( req: Request, res: Response, next: NextFunction ) => 
{
	try 
	{
		await menstrualCycleService.deleteMenstrualCycle( req as AuthRequest );
	}
	catch ( error )
	{
		return next( new AppError( error.message, error.code ) );
	}
	res.status( 204 ).send();
}
);

export default router;
