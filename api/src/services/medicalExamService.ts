import { MedicalExam } from '../model/entity/MedicalExam';
import { MedicalExamRepository } from '../dao/medicalExamRepository';
import * as userService from '../services/userService';
import * as gynecologistService from './gynecologistService';
import { AuthRequest } from '../model/request/AuthRequest';
import { AppError } from '../model/constants/AppError';
import { MedicalExamCreateRequest } from '../model/request/MedicalExamCreateRequest';

export const getMedicalExams = async ( req : AuthRequest ): Promise<MedicalExam[]> => 
{
	return await MedicalExamRepository.createQueryBuilder( 'medicalExam' )
		.leftJoinAndSelect( 'medicalExam.gynecologist', 'gynecologist' )
		.where( 'medicalExam.user.id = :userId', { userId: req.userData.id } )
		.orderBy( 'date', 'DESC' )
		.getMany()
		.catch( ()=>
		{
			throw new AppError( 'Internal Server Error', 500 );
		} );
};

export const insertMedicalExam = async ( req : AuthRequest ) => 
{
	const user = await userService.getUserbyId( req.userData.id );
	let gyn = null;
	if ( req.body.gynecologistId )
	{

		gyn = await gynecologistService.getGynecologistbyId( req.body.gynecologistId );
	}
	if ( !user ) 
	{
		throw new AppError ( 'Unauthorized', 401 );
	}
	const medicalExam = await MedicalExamCreateRequest.toEntity( req.body as MedicalExamCreateRequest, user, gyn );
	await MedicalExamRepository.save( medicalExam )
		.catch( () =>
		{
			throw new AppError( 'Internal Server Error', 500 );
		} );
};

export const deleteMedicalExam = async ( examId: string ) => 
{
	const result = await MedicalExamRepository.delete( examId )
		.catch( () => 
		{
			throw new AppError( 'Internal Server Error', 500 );
		} );
	if ( result.affected === 0 ) 
	{
		throw new AppError( 'Medical exam not found', 404 );
	}
};
