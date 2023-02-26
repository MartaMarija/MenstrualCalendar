import { MenstrualCycle } from '../entity/MenstrualCycle';

export class MenstrualCycleUpdateRequest 
{
	constructor(
		public periodEndDate: Date,
	) 
	{}
  
	public static async toEntity( menstrualCycleUpdateRequest: MenstrualCycleUpdateRequest, menstrualCycleId : string ): Promise<MenstrualCycle> 
	{
		return new MenstrualCycle(
			menstrualCycleId,
			menstrualCycleUpdateRequest.periodEndDate,
			undefined,
			undefined,
		);
	}
}