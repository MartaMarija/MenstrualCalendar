import { MedicalExam } from '../entity/MedicalExam';

export class MedicalExamResponse 
{
	constructor(
		public id: string,
		public date: Date,
		public description: string,
		public gynName: string | undefined
	) 
	{}

	public static toDto( medicalExam: MedicalExam ): MedicalExamResponse 
	{
		return new MedicalExamResponse(
			medicalExam.id,
			medicalExam.date,
			medicalExam.description,
			medicalExam.gynecologist?.first_name
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