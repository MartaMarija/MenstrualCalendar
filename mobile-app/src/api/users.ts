import apiOrigin from './api';
import { LoginData } from './request/LoginData';

export const loginUser = async ( loginData: LoginData ) => 
{
	let data;
	try 
	{
		data = await fetch( `${apiOrigin}/users/login`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify( {
				email: loginData.email,
				password: loginData.password,
			} ),
		} );
	}
	catch ( error ) 
	{
		console.log( error );
		throw error;
	}
	return await data.json();
};
