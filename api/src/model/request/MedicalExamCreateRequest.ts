import { Gynecologist } from '../entity/Gynecologist';
import { MedicalExam } from '../entity/MedicalExam';
import { User } from '../entity/User';

export class MedicalExamCreateRequest 
{
	constructor(
      public date: Date,
      public description: string
	) 
	{}
  
	public static async toEntity( medicalExamCreateRequest: MedicalExamCreateRequest, user: User, gyn: Gynecologist ): Promise<MedicalExam> 
	{
		return new MedicalExam(
			medicalExamCreateRequest.date,
			medicalExamCreateRequest.description,
			gyn,
			user
		);
	}
}