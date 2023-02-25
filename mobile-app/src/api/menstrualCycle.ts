import api from './apiAuth';
import { MenstrualCycleDates } from './response/MenstrualCycleDates';

// export const showLoginOptions = async ( token: string | undefined,date: string,route: string ): Promise<boolean> => 
// {
// 	let data;
// 	try 
// 	{
// 		data = await fetch( `${apiOrigin}/menstrualCycles/${route}/${date}`, {
// 			method: 'GET',
// 			headers: {
// 				Accept: 'application/json',
// 				'Content-Type': 'application/json',
// 				Authorization: 'Bearer ' + token,
// 			},
// 		} );
// 	}
// 	catch ( error ) 
// 	{
// 		console.log( error );
// 		throw error;
// 	}
// 	return ( await data.json() ) as boolean;
// };

// export const updateDatabase = async ( token: string | undefined,date: string,route: string ): Promise<boolean> => 
// {
// 	let data;
// 	try 
// 	{
// 		data = await fetch( `${apiOrigin}/menstrualCycles/${route}/${date}`, {
// 			method: 'GET',
// 			headers: {
// 				Accept: 'application/json',
// 				'Content-Type': 'application/json',
// 				Authorization: 'Bearer ' + token,
// 			},
// 		} );
// 	}
// 	catch ( error ) 
// 	{
// 		console.log( error );
// 		throw error;
// 	}
// 	return ( await data.json() ) as boolean;
// };

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
