import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../model/constants/AppError';
import * as medicalExamService from '../services/medicalExamService';
import * as jwtService from '../services/jwtService';
import { MedicalExam } from '../model/entity/MedicalExam';
const router = express.Router();

router.get( '/', async ( req: Request, res: Response, next: NextFunction ) => 
{
	const jwt = jwtService.authenticateToken( req );
	if ( jwt ) 
	{
		return res.json( await medicalExamService.getMedicalExams( jwt.id ) );
	}
	return next( new AppError( 'Invalid token!', 400 ) );
} );

router.post(
	'/addExam',
	async ( req: Request, res: Response, next: NextFunction ) => 
	{
		const jwt = jwtService.authenticateToken( req );
		if ( jwt ) 
		{
			const exam: MedicalExam = new MedicalExam();
			exam.date = req.body.date;
			exam.description = req.body.description;
			return res.json(
				await medicalExamService.insertMedicalExam(
					jwt.id,
					exam,
					req.body.gynecologistId
				)
			);
		}
		return next( new AppError( 'Invalid token!', 400 ) );
	}
);

router.get(
	'/removeExam/:examId',
	async ( req: Request, res: Response, next: NextFunction ) => 
	{
		const jwt = jwtService.authenticateToken( req );
		if ( jwt ) 
		{
			return res.json(
				await medicalExamService.deleteMedicalExam( req.params.examId )
			);
		}
		return next( new AppError( 'Invalid token!', 400 ) );
	}
);

export default router;
