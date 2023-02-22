import * as EmailValidator from 'email-validator';
import { AppError } from '../model/constants/AppError';
import { Request } from 'express';
import * as argon2 from 'argon2';
import { LoginResponse } from '../model/response/LoginResponse';
import jsonwebtoken from 'jsonwebtoken';
import { UserData } from '../model/request/AuthRequest';
import * as userService from '../services/userService';
import sgMail from '@sendgrid/mail';

export const loginUser = async ( req: Request ) : Promise<LoginResponse> => 
{
	const userEmail = req.body.email;
	if ( !EmailValidator.validate( userEmail ) ) 
	{
		throw new AppError( 'Unauthorized', 401 );
	}
	const user = await userService.getUserbyEmail( userEmail );
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
		await compareTokens( token as string, userData.id );
		return getTokens( userData );
	}
	catch ( error )
	{
		const errorMessage = ( error instanceof AppError ) ? error.message : 'Unauthorized';		
		const errorCode = ( error instanceof AppError ) ? error.code : 401;	
		throw new AppError( errorMessage, errorCode );
	}
};

async function getTokens( userData : UserData ) : Promise<LoginResponse>
{
	const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
	const refreshTokenKey = process.env.REFRESH_SECRET_KEY;
	if( !accessTokenKey || !refreshTokenKey )
	{
		throw new AppError( 'Internal Server Error', 500 );
	}
	const accessToken = jsonwebtoken.sign( userData, accessTokenKey, { expiresIn: '1h' } );
	const refreshToken = jsonwebtoken.sign( userData, refreshTokenKey, { expiresIn: '14d' } );
	await saveRefreshToken( refreshToken, userData.id );
	return new LoginResponse( accessToken, refreshToken );
}

async function saveRefreshToken( refreshToken : string, userId : string ) 
{
	const user = await userService.getUserbyId( userId );
	if( !user )
	{
		throw new AppError( 'Unauthorized', 401 );
	}
	user.refresh_token = refreshToken;
	try
	{
		await userService.saveUser( user );
	}
	catch
	{
		throw new AppError( 'Internal Server Error', 500 );
	}
}

async function compareTokens( refreshToken : string, userId : string ) 
{
	const user = await userService.getUserbyId( userId );
	if( !user )
	{
		throw new AppError( 'Unauthorized', 401 );
	}
	if ( user.refresh_token !== refreshToken )
	{
		user.refresh_token = '';
		try
		{
			await userService.saveUser( user );
		}
		catch
		{
			throw new AppError( 'Internal Server Error', 500 );
		}
		const emailSubject = 'Action required: suspicious activity on your account';
		const emailBody = 'Dear ' + user.first_name 
		+ ',\n\n'
		+ 'We hope this email finds you well. We are writing to inform you that we have detected some suspicious activity on your account. We suspect that your account may have been hacked.'
		+ '\n\n'
		+ 'As a precautionary measure, we recommend that you contact us as soon as possible to discuss the details of this incident. Please respond to this email and one of our representatives will get back to you promptly.'
		+ '\n\n'
		+ 'We take the security of our users` accounts very seriously, and we want to ensure that your account is secure. We apologize for any inconvenience this may have caused you and thank you for your cooperation in this matter.'
		+ '\n\n'
		+ 'Best regards,\nMenstrualCalendar';
		sendEmail( user.email, emailSubject, emailBody );
		throw new AppError( 'Unauthorized', 401 );
	}
}

function sendEmail( _email : string, emailSubject : string, emailBody : string )
{
	if ( !process.env.SENDGRID_API_KEY ) 
	{
		throw new AppError( 'Internal Server Error', 500 );
	}
	sgMail.setApiKey( process.env.SENDGRID_API_KEY );
	//to: email
	const msg = {
		to: 'picic.marta1@gmail.com',
		from: 'bibly.knjiznica@gmail.com',
		subject: emailSubject,
		text: emailBody
	};
	sgMail.send( msg ).catch( () => 
	{
		throw new AppError( 'Internal Server Error', 500 );
	} );
}