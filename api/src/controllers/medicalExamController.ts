import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../model/constants/AppError';
import * as medicalExamService from '../services/medicalExamService';
import { authenticateUser } from '../auth/authenticateUser';
import { AuthRequest } from '../model/request/AuthRequest';
import { MedicalExamResponse } from '../model/response/MedicalExamResponse';
import { validationResult, check } from 'express-validator';
const router = express.Router();

router.use( authenticateUser );

router.get( '/', async ( req: Request, res: Response, next: NextFunction ) => 
{
	let medicalExams;
	try
	{
		medicalExams = await medicalExamService.getMedicalExams(  req as AuthRequest );
	}
	catch ( error )
	{
		return next( new AppError( error.message, error.code ) );
	}
	res.json( MedicalExamResponse.toDtos( medicalExams ) );
} );

router.post( '/',
	[
		check( 'description' ).notEmpty(),
	],  async ( req: Request, res: Response, next: NextFunction ) => 
	{
		const errors = validationResult( req );
		if ( !errors.isEmpty() ) 
		{
			return next( new AppError( 'Bad request', 400 ) );
		}
		try
		{
			await medicalExamService.insertMedicalExam( req as AuthRequest );
		}
		catch ( error )
		{
			return next( new AppError( error.message, error.code ) );
		}
		res.status( 201 ).json( { message: 'Medical exam added successfully!' } );
	}
);

router.delete( '/:medicalExamId', async ( req: Request, res: Response, next: NextFunction ) => 
{
	try 
	{
		await medicalExamService.deleteMedicalExam( req.params.medicalExamId );
	}
	catch ( error )
	{
		return next( new AppError( error.message, error.code ) );
	}
	res.status( 204 ).send();
}
);

export default router;
