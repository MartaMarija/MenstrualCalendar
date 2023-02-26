import { MenstrualCycle } from '../entity/MenstrualCycle';
import { User } from '../entity/User';

export class MenstrualCycleCreateRequest 
{
	constructor(
      public cycleStartDate: Date,
	) 
	{}
  
	public static async toEntity( menstrualCycleCreateRequest: MenstrualCycleCreateRequest, user: User ): Promise<MenstrualCycle> 
	{
		return new MenstrualCycle(
			undefined,
			undefined,
			menstrualCycleCreateRequest.cycleStartDate,
			user
		);
	}
}