import api from './apiAuth';
import { Gynecologist } from './response/Gynecologist';

export const getGynecologists = async (): Promise<Gynecologist[]> => 
{
	try 
	{
		const response = await api.get( '/gyns' );
		return response.data as Gynecologist[];
	}
	catch ( error ) 
	{
		console.log( error );
		throw error;
	}
};

export const insertGynecologist = async ( gyn: Gynecologist ) => 
{
	try 
	{
		const response = await api.post( '/gyns', {
			first_name: gyn.first_name,
			last_name: gyn.last_name,
			telephone: gyn.telephone,
			address: gyn.address,
		} );
		return response.data;
	}
	catch ( error ) 
	{
		console.log( error );
		throw error;
	}
};

export const delteGynecologist = async ( gynId: string ) => 
{
	try 
	{
		const response = await api.delete( `/gyns/${gynId}` );
		return response.data;
	}
	catch ( error ) 
	{
		console.log( error );
		throw error;
	}
};
