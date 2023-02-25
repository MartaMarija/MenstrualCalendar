import React, { createContext, useState, useContext, useEffect } from 'react';
import { LoginData } from '../api/request/LoginData';
import { loginUser } from '../api/users';
import { AuthData } from '../api/type/AuthData';
import * as auth from '../api/token';

interface Props {
    children: React.ReactNode
}

type AuthContextData = {
    authData?: AuthData
    loading: boolean
    signIn( loginData: LoginData ): Promise<void>
    signOut(): void
}

export const AuthContext = createContext<AuthContextData>( {} as AuthContextData );

export const AuthContextProvider: React.FC<Props> = ( { children } ) => 
{
	const [authData, setAuthData] = useState<AuthData>();
	const [loading, setLoading] = useState( true );

	useEffect( () => 
	{
		loadStorageData();
	}, [] );

	async function loadStorageData(): Promise<void> 
	{
		try 
		{
			const authData = await auth.getTokens();
			setAuthData( authData );
		}
		catch ( error ) 
		{
			console.log( error );
		}
		finally 
		{
			setLoading( false );
		}
	}

	const signIn = async ( loginData: LoginData ) => 
	{
		const response = await loginUser( loginData );
		console.log( response );
		const authData : AuthData = { accessToken: response.accessToken, refreshToken: response.refreshToken };
		if( authData != undefined )
		{
			setAuthData( authData );
			await auth.setTokens( authData );
		}
	};

	const signOut = async () => 
	{
		setAuthData( undefined );
		await auth.removeTokens();
	};

	return (
		<AuthContext.Provider value={{ authData, loading, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext( AuthContext );
