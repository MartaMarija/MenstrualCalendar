import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { AppError } from '../model/constants/AppError';
import { AuthRequest } from '../model/request/AuthRequest';

export async function authenticateUser( req: Request, _: Response, next: NextFunction ) 
{
	try 
	{
		const authHeader = req.headers['authorization'];
		if ( !authHeader )
		{
			throw new Error( 'Authorization header is not present!' );
		}
		const token = authHeader.split( ' ' )[1];
		if( !token )
		{
			throw new Error( 'Authorization header is not formatted properly!' );
		}
		const tokenKey = process.env.ACCESS_TOKEN_KEY;
		if( !tokenKey )
		{
			throw new Error( 'Access token key is not present!' );
		}
		const tokenPayload = jsonwebtoken.verify( token, tokenKey ) as jsonwebtoken.JwtPayload;
		( req as AuthRequest ).userData = { id: tokenPayload.id };
		next();
	}
	catch
	{
		return next( new AppError( 'Unauthorized', 401 ) );
	}
}
