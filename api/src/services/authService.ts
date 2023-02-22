import * as EmailValidator from 'email-validator';
import { AppError } from '../model/constants/AppError';
// import { User } from '../model/entity/User';
import { UserRepository } from '../dao/userRepository';
import { Request } from 'express';
import * as argon2 from 'argon2';
import { LoginResponse } from '../model/response/LoginResponse';
import jsonwebtoken from 'jsonwebtoken';
import { UserData } from 'src/model/request/AuthRequest';

export const loginUser = async ( req: Request ) : Promise<LoginResponse> => 
{
	const userEmail = req.body.email;
	if ( !EmailValidator.validate( userEmail ) ) 
	{
		throw new AppError( 'Unauthorized', 401 );
	}
	const user = await UserRepository.findOne( { where: { email: userEmail } } );
	if ( !user ) 
	{
		throw new AppError( 'Unauthorized', 401 );
	}
	const userPassword = req.body.password;
	if(  !await argon2.verify( user.password, userPassword ) )
	{
		throw new AppError( 'Unauthorized', 401 );
	}
	const userData : UserData = { id: user.id };
	return getTokens( userData );
};

export const refreshToken = async ( req: Request ) : Promise<LoginResponse> =>
{
	try 
	{
		const token = req.headers['x-refresh-token'];
		if ( !token )
		{
			throw new Error( 'Header is not present!' );
		}
		const tokenKey = process.env.REFRESH_SECRET_KEY;
		if( !tokenKey )
		{
			throw new Error( 'Refresh token key is not present!' );
		}
		const tokenPayload = jsonwebtoken.verify( token as string, tokenKey ) as jsonwebtoken.JwtPayload;
		const userData : UserData = { id: tokenPayload.id };
		return getTokens( userData );
	}
	catch
	{
		throw new AppError( 'Unauthorized', 401 );
	}
};

function getTokens( userData : UserData ) : LoginResponse
{
	const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
	const refreshTokenKey = process.env.REFRESH_SECRET_KEY;
	if( !accessTokenKey || !refreshTokenKey )
	{
		throw new AppError( 'Internal Server Error', 500 );
	}
	const accessToken = jsonwebtoken.sign( userData, accessTokenKey, { expiresIn: '1h' } );
	const refreshToken = jsonwebtoken.sign( userData, refreshTokenKey, { expiresIn: '14d' } );
	return new LoginResponse( accessToken, refreshToken );
}