import { MedicalExam } from '../entity/MedicalExam';
import { GynecologistResponse } from './GynecologistResponse';

export class MedicalExamResponse 
{
	constructor(
		public id: string,
		public date: Date,
		public description: string,
		public gynecologist: GynecologistResponse | undefined
	) 
	{}

	public static toDto( medicalExam: MedicalExam ): MedicalExamResponse 
	{
		const gynecologist = medicalExam.gynecologist ? GynecologistResponse.toDto( medicalExam.gynecologist ) : undefined; 
		return new MedicalExamResponse(
			medicalExam.id,
			medicalExam.date,
			medicalExam.description,
			gynecologist
		);
	}

	public static toDtos( medicalExams: MedicalExam[] ): MedicalExamResponse[]
	{
		const medicalExamResponse: MedicalExamResponse[] = [];
		medicalExams.forEach( ( medicalExam: MedicalExam ) => 
		{
			medicalExamResponse.push( MedicalExamResponse.toDto( medicalExam ) );
		} );
		return medicalExamResponse;
	}
}