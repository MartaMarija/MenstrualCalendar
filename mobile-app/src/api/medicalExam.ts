import apiOrigin from './api';
import { MedicalExam } from './response/MedicalExam';

export const getMedicalExams = async ( token: string | undefined ): Promise<MedicalExam[]> => 
{
	let data;
	try 
	{
		data = await fetch( `${apiOrigin}/medicalExams`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		} );
	}
	catch ( error ) 
	{
		console.log( error );
		throw error;
	}
	return ( await data.json() ) as MedicalExam[];
};

export const insertMedicalExam = async ( token: string | undefined,examData: MedicalExam ): Promise<boolean> => 
{
	let data;
	try 
	{
		data = await fetch( `${apiOrigin}/medicalExams/addExam`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
			body: JSON.stringify( {
				description: examData.description,
				date: examData.date,
				gynecologistId: examData.gynecologist.id
			} ),
		} );
	}
	catch ( error ) 
	{
		console.log( error );
		throw error;
	}
	return ( await data.json() ) as boolean;
};


export const delteMedicalExam = async ( token: string | undefined,examId: string ): Promise<boolean> => 
{
	let data;
	try 
	{
		data = await fetch( `${apiOrigin}/medicalExams/removeExam/${examId}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			}
		} );
	}
	catch ( error ) 
	{
		console.log( error );
		throw error;
	}
	return ( await data.json() ) as boolean;
};