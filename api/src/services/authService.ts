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
	const accessToken = getAccessToken( userData );
	const refreshToken = getRefreshToken( userData );
	return new LoginResponse( accessToken, refreshToken );
};

function getAccessToken( userData : UserData )
{
	const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
	if( !accessTokenKey )
	{
		throw new AppError( 'Internal Server Error', 500 );
	}
	const accessToken = jsonwebtoken.sign( userData, accessTokenKey, { expiresIn: '1h' } );
	return accessToken;
}

function getRefreshToken( userData : UserData )
{
	const refreshTokenKey = process.env.REFRESH_SECRET_KEY;
	if( !refreshTokenKey )
	{
		throw new AppError( 'Internal Server Error', 500 );
	}
	const refreshToken = jsonwebtoken.sign( userData, refreshTokenKey, { expiresIn: '14d' } );
	return refreshToken;
}