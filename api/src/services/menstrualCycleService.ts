import { MenstrualCycleRepository } from '../dao/menstrualCycleRepository';
import * as userService from '../services/userService';
import { AuthRequest } from '../model/request/AuthRequest';
import { AppError } from '../model/constants/AppError';
import { MenstrualCycleDatesResponse } from '../model/response/MenstrualCyclesDates';
import { MenstrualCycleCreateRequest } from '../model/request/MenstrualCycleCreateRequest';

export const getMenstrualCycles = async ( req : AuthRequest ) => 
{
	return await MenstrualCycleRepository.find(
		{
			select: {
				cycle_start_date: true,
				menstruation_end_date: true,
				ovulation_date: true,
			},
			where: [{ user: { id: req.userData.id } }],
			order: { cycle_start_date: 'DESC' },
		}
	).catch( ()=>
	{
		throw new AppError( 'Internal Server Error', 500 );
	} );
};

export const calculateNextCycleDates = async ( req : AuthRequest, lastCycleStartDate : Date ) : Promise<MenstrualCycleDatesResponse> =>
{
	const user = await userService.getMenstrualCycleInfoFromUser( req.userData.id )
		.catch( ()=>
		{
			throw new AppError( 'Internal Server Error', 500 );
		} );
	if ( !user ) 
	{
		throw new AppError( 'Internal Server Error', 500 );
	}
	const newStartDate = addDaysToDate( lastCycleStartDate, user.avg_duration_of_menstrual_cycle );
	const newEndDate = addDaysToDate( newStartDate,  user.avg_duration_of_menstruation - 1 );
	const newOvulationDate = addDaysToDate( newStartDate, user.avg_duration_of_luteal_phase - 1 );
	return new MenstrualCycleDatesResponse( newStartDate, newEndDate, newOvulationDate, false, true ); 
};

export const insertMenstrualCycle = async ( req : AuthRequest ) => 
{
	const user = await userService.getUserbyId( req.userData.id );
	if ( !user ) 
	{
		throw new AppError ( 'Unauthorized', 401 );
	}
	const menstrualCycle = await MenstrualCycleCreateRequest.toEntity( req.body as MenstrualCycleCreateRequest, user );
	await MenstrualCycleRepository.save( menstrualCycle )
		.catch( () =>
		{
			throw new AppError( 'Internal Server Error', 500 );
		} );
};

function addDaysToDate( date : Date, daysToAdd : number )
{
	const newDate = new Date( date );
	newDate.setDate( newDate.getDate() + daysToAdd );
	return newDate;
}


