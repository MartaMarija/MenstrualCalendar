import api from './apiAuth';
import { MenstrualCycleDates } from './response/MenstrualCycleDates';

export const getMenstrualCycleDates = async (): Promise<MenstrualCycleDates[]> => 
{
	try 
	{
		const response = await api.get( '/menstrualCycles' );
		return response.data as MenstrualCycleDates[];
	}
	catch ( error ) 
	{
		console.log( error );
		throw error;
	}
};

export const insertMenstrualCycle = async ( cycleStartDate : string ) => 
{
	try 
	{
		const response = await api.post( '/menstrualCycles', {
			cycleStartDate: cycleStartDate
		} );
		return response.data;
	}
	catch ( error ) 
	{
		console.log( error );
		throw error;
	}
};

export const deleteMenstrualCycle = async () => 
{
	try 
	{
		const response = await api.delete( '/menstrualCycles/lastMenstrualCycle' );
		console.log( response.status );
		return response.status;
	}
	catch ( error ) 
	{
		console.log( error );
		throw error;
	}
};
