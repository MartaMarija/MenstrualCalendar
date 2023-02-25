import apiOrigin from './api';
import { Gynecologist } from './response/Gynecologist';

export const delteGynecologist = async ( token: string | undefined,gynId: string ): Promise<boolean> => 
{
	let data;
	try 
	{
		data = await fetch( `${apiOrigin}/gyn/removeGyn/${gynId}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			}
		} );
	}
	catch ( error ) 
	{
		console.log( error );
		throw error;
	}
	return ( await data.json() ) as boolean;
};

export const insertGynecologist = async ( token: string | undefined,gynData: Gynecologist ): Promise<boolean> => 
{
	let data;
	try 
	{
		data = await fetch( `${apiOrigin}/gyn/addGyn`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
			body: JSON.stringify( {
				firstName: gynData.first_name,
				lastName: gynData.last_name,
				telephone: gynData.telephone,
				address: gynData.address,
			} ),
		} );
	}
	catch ( error ) 
	{
		console.log( error );
		throw error;
	}
	return ( await data.json() ) as boolean;
};

export const getGynecologists = async ( token: string | undefined ): Promise<Gynecologist[]> => 
{
	let data;
	try 
	{
		data = await fetch( `${apiOrigin}/gyn`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		} );
	}
	catch ( error ) 
	{
		console.log( error );
		throw error;
	}
	return ( await data.json() ) as Gynecologist[];
};
