import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthData } from './type/AuthData';

export async function getAccessToken()
{
	const authDataSerialized = await AsyncStorage.getItem( '@AuthData' );
	if ( authDataSerialized ) 
	{
		const authData: AuthData = JSON.parse( authDataSerialized );
		return authData.accessToken; 
	}
	return '';
}
  
export async function getRefreshToken()
{
	const authDataSerialized = await AsyncStorage.getItem( '@AuthData' );
	if ( authDataSerialized ) 
	{
		const authData: AuthData = JSON.parse( authDataSerialized );
		return authData.refreshToken; 
	}
	return '';
}

export async function getTokens(): Promise<AuthData>
{
	const authDataSerialized = await AsyncStorage.getItem( '@AuthData' );
	if ( authDataSerialized ) 
	{
		const authData: AuthData = JSON.parse( authDataSerialized );
		return authData; 
	}
	return { accessToken: '', refreshToken: '' };
}

export async function setTokens( authData: AuthData )
{
	AsyncStorage.setItem( '@AuthData', JSON.stringify( authData ) );
}

export async function removeTokens()
{
	await AsyncStorage.removeItem( '@AuthData' );
}