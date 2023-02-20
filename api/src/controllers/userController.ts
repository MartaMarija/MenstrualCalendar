import express from 'express';
import { AppError } from '../model/constants/AppError';
import { User } from '../model/entity/User';
import * as userService from '../services/userService';
import * as jwtService from '../services/jwtService';
const router = express.Router();

router.post( '/login', async ( req, res, next ) => 
{
	const user: User | null = await userService.getUserbyEmail( req.body.email );
	if ( !user ) 
	{
		return next( new AppError( 'Invalid email!', 400 ) );
	}
	if ( user.password != req.body.password ) 
	{
		return next( new AppError( 'Invalid password!', 401 ) );
	}
	res.json( { token: jwtService.getToken( user.id ) } );
} );

export default router;
