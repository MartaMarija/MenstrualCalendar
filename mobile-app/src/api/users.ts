import api from './apiAuth';
import { LoginData } from './request/LoginData';

export const loginUser = async ( loginData: LoginData ) => 
{
	try 
	{
		const response = await api.post( '/auth/login', {
			email: loginData.email,
			password: loginData.password,
		} );
		return response.data;
	}
	catch ( error ) 
	{
		console.log( error );
		throw error;
	}
};