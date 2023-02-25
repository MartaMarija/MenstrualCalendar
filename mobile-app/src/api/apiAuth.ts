import axios from 'axios';
import { AuthData } from './type/AuthData';
import * as token from './token';
//192.168.243.244
const api = axios.create( {
	baseURL: 'http://192.168.243.244:8000/api',
	headers: {
		'Content-Type': 'application/json'
	},
} );

api.interceptors.request.use( 
	async ( config ) => 
	{
		const accessToken = await token.getAccessToken();
		if ( accessToken ) 
		{
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	( error ) => 
	{
		return Promise.reject( error );
	} );
  
api.interceptors.response.use(
	( response ) => 
	{
		return response;
	},
	async ( error ) => 
	{
		const originalRequest = error.config;
		if ( error.response && error.response.status === 401 && !originalRequest._retry ) 
		{
			originalRequest._retry = true;
			const oldRefreshToken = await token.getRefreshToken(); 
			if( !oldRefreshToken  )
			{
				return Promise.reject( error );
			}
			try 
			{
				const response = await api.post( '/auth/refresh', {}, { headers: { 'x-refresh-token': oldRefreshToken } } );
				const { accessToken, refreshToken } = response.data;
				await token.setTokens( { accessToken, refreshToken } as AuthData ); 
				originalRequest.headers.Authorization = `Bearer ${accessToken}`;
				return api( originalRequest );
			}
			catch ( error ) 
			{
				await token.removeTokens();
				return Promise.reject( error );
			}
		}
		return Promise.reject( error );
	}
);

export default api;
