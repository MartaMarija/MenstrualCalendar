import api from './apiAuth';
import { MedicalExam } from './response/MedicalExam';

export const getMedicalExams = async (): Promise<MedicalExam[]> => 
{
	try 
	{
		const response = await api.get( '/medicalExams' );
		return response.data as MedicalExam[];
	}
	catch ( error ) 
	{
		console.log( error );
		throw error;
	}
};

export const insertMedicalExam = async ( examData: MedicalExam ) => 
{
	try 
	{
		const response = await api.post( '/medicalExams', {
			description: examData.description,
			date: examData.date,
			gynecologistId: examData.gynecologist.id
		} );
		return response.data;
	}
	catch ( error ) 
	{
		console.log( error );
		throw error;
	}
};


export const delteMedicalExam = async ( examId: string ) => 
{
	try 
	{
		const response = await api.delete( `/medicalExams/${examId}` );
		return response.data;
	}
	catch ( error ) 
	{
		console.log( error );
		throw error;
	}
};