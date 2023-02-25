import { MenstrualCycleRepository } from '../dao/menstrualCycleRepository';
import * as userService from '../services/userService';
import { AuthRequest } from '../model/request/AuthRequest';
import { AppError } from '../model/constants/AppError';
import { MenstrualCycleDatesResponse } from '../model/response/MenstrualCyclesDates';

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

function addDaysToDate( date : Date, daysToAdd : number )
{
	const newDate = new Date( date );
	newDate.setDate( newDate.getDate() + daysToAdd );
	return newDate;
}

// function fromDataToString( date: Date ) 
// {
// 	const month = date.toLocaleDateString( 'en-US', { month: '2-digit' } );
// 	const day = date.toLocaleDateString( 'en-US', { day: '2-digit' } );
// 	return `${date.getFullYear()}-${month}-${day}`;
// }

// async function getLastCycleId( id: string ) 
// {
// 	return await MenstrualCycleRepository.createQueryBuilder( 'mc' )
// 		.select( 'mc.id' )
// 		.where( 'mc.user.id = :userId', { userId: id } )
// 		.orderBy( 'mc.cycle_start_date', 'DESC' )
// 		.getOne();
// }

// export const getDates = async ( req : AuthRequest ): Promise<DateSettings[]> => 
// {
// 	const menstrualCycles: MenstrualCycle[] = await MenstrualCycleRepository.find(
// 		{
// 			select: {
// 				cycle_start_date: true,
// 				menstruation_end_date: true,
// 				ovulation_date: true,
// 			},
// 			where: [{ user: { id: req.userData.id } }],
// 		}
// 	);

// 	const dates: DateSettings[] = [];
// 	menstrualCycles.forEach( ( cycle ) => 
// 	{
// 		const cycleStartDay: string = fromDataToString(
// 			new Date( cycle.cycle_start_date )
// 		);
// 		dates.push( new DateSettings( cycleStartDay, '#D31D1D', 'white', true, false ) );

// 		const menstruationEndDate: string = fromDataToString(
// 			new Date( cycle.menstruation_end_date )
// 		);
// 		dates.push(
// 			new DateSettings( menstruationEndDate, '#D31D1D', 'white', false, true )
// 		);

// 		const ovulationDate: string = fromDataToString(
// 			new Date( cycle.ovulation_date )
// 		);
// 		dates.push( new DateSettings( ovulationDate, '#F564A9', 'white', true, true ) );

// 		const dateBetween = new Date( cycle.cycle_start_date );
// 		dateBetween.setDate( dateBetween.getDate() + 1 );
// 		while ( dateBetween < new Date( cycle.menstruation_end_date ) ) 
// 		{
// 			const _dateBetween: string = fromDataToString( dateBetween );
// 			dates.push( new DateSettings( _dateBetween, '#D31D1D', 'white', false, false ) );
// 			dateBetween.setDate( dateBetween.getDate() + 1 );
// 		}
// 	} );

// 	//first next cycle
// 	const user = await userService.getMenstrualCycleInfoFromUser( req.userData.id );
// 	if ( user != null ) 
// 	{
// 		const lastCycle = await getLastCycleStartDate( req.userData.id );
// 		if ( lastCycle != null ) 
// 		{
// 			const lastCycleDate = new Date( lastCycle.cycle_start_date );
// 			lastCycleDate.setDate(
// 				lastCycleDate.getDate() + user.avg_duration_of_menstrual_cycle
// 			);
// 			const cycleStartDay: string = fromDataToString( new Date( lastCycleDate ) );
// 			dates.push( new DateSettings( cycleStartDay, 'blue', 'white', true, false ) );

// 			const menstruationEndDate: string = fromDataToString(
// 				new Date(
// 					lastCycleDate.setDate(
// 						lastCycleDate.getDate() + user.avg_duration_of_menstruation - 1
// 					)
// 				)
// 			);
// 			dates.push(
// 				new DateSettings( menstruationEndDate, 'blue', 'white', false, true )
// 			);

// 			const ovulationDate: string = fromDataToString(
// 				new Date(
// 					lastCycleDate.setDate(
// 						lastCycleDate.getDate() + user.avg_duration_of_luteal_phase - 1
// 					)
// 				)
// 			);
// 			dates.push( new DateSettings( ovulationDate, 'blue', 'white', true, true ) );

// 			const dateBetween = new Date( cycleStartDay );
// 			dateBetween.setDate( dateBetween.getDate() + 1 );
// 			while ( dateBetween < new Date( menstruationEndDate ) ) 
// 			{
// 				const _dateBetween: string = fromDataToString( dateBetween );
// 				dates.push(
// 					new DateSettings( _dateBetween, 'blue', 'white', false, false )
// 				);
// 				dateBetween.setDate( dateBetween.getDate() + 1 );
// 			}
// 		}
// 	}

// 	return dates;
// };

// export const canRemovePeriod = async (
// 	id: string,
// 	date: Date
// ): Promise<boolean> => 
// {
// 	const lastCycle = await getLastCycleStartDate( id );
// 	if ( lastCycle != null ) 
// 	{
// 		const newDate = new Date( lastCycle.cycle_start_date );
// 		if ( newDate.toString() == date.toString() ) 
// 		{
// 			return true;
// 		}
// 	}
// 	return false;
// };

// export const canEndPeriod = async (
// 	id: string,
// 	date: Date
// ): Promise<boolean> => 
// {
// 	const lastCycle = await getLastCycleStartDate( id );
// 	if ( lastCycle != null ) 
// 	{
// 		const lastCycleDate = new Date( lastCycle.cycle_start_date );
// 		const pomDate = new Date( lastCycleDate );
// 		lastCycleDate.setDate( lastCycleDate.getDate() + 12 );
// 		if ( date >= pomDate && date <= lastCycleDate ) return true;
// 	}
// 	return false;
// };

// export const canAddPeriod = async (
// 	id: string,
// 	date: Date
// ): Promise<boolean> => 
// {
// 	const lastCycle = await getLastCycleStartDate( id );
// 	if ( lastCycle != null ) 
// 	{
// 		const lastCycleDate = new Date( lastCycle.cycle_start_date );
// 		lastCycleDate.setDate( lastCycleDate.getDate() + 13 );
// 		const today = new Date();
// 		if ( date >= lastCycleDate && date <= today ) 
// 		{
// 			return true;
// 		}
// 		else 
// 		{
// 			return false;
// 		}
// 	}
// 	return true;
// };

// export const RemovePeriod = async ( id: string ): Promise<boolean> => 
// {
// 	const menstrualCycle: MenstrualCycle | null = await getLastCycleId( id );
// 	if ( menstrualCycle != null ) 
// 	{
// 		MenstrualCycleRepository.delete( menstrualCycle.id );
// 		return true;
// 	}
// 	return false;
// };

// export const EndPeriod = async ( id: string, date: Date ): Promise<boolean> => 
// {
// 	const menstrualCycle: MenstrualCycle | null = await getLastCycleId( id );
// 	if ( menstrualCycle != null ) 
// 	{
// 		const today = new Date();
// 		if ( date <= today ) 
// 		{
// 			const menstrualCyclePom = new MenstrualCycle();
// 			menstrualCyclePom.id = menstrualCycle.id;
// 			menstrualCyclePom.menstruation_end_date = date;
// 			MenstrualCycleRepository.save( menstrualCyclePom );
// 			return true;
// 		}
// 	}
// 	return false;
// };

// export const AddPeriod = async ( id: string, date: Date ): Promise<boolean> => 
// {
// 	const user: User | null = await userService.getUserbyId( id );
// 	if ( user != null ) 
// 	{
// 		const menstrualCycle = new MenstrualCycle();
// 		menstrualCycle.cycle_start_date = date;
// 		menstrualCycle.user = user;
// 		MenstrualCycleRepository.save( menstrualCycle );
// 		return true;
// 	}
// 	return false;
// };





// async function getLastCycleStartDate( id: string ) 
// {
// 	return await MenstrualCycleRepository.createQueryBuilder( 'mc' )
// 		.select( 'mc.cycle_start_date' )
// 		.where( 'mc.user.id = :userId', { userId: id } )
// 		.orderBy( 'mc.cycle_start_date', 'DESC' )
// 		.getOne();
// }
