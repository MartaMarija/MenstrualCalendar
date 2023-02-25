import { MenstrualCycle } from '../entity/MenstrualCycle';

export class MenstrualCycleDatesResponse 
{
	constructor(
		public cycleStart : Date,
		public cycleEnd : Date,
		public ovulation : Date,
        public isInLastCycle : boolean,
        public isNextCycle : boolean
	) 
	{}

	public static toDto( menstrualCycle: MenstrualCycle, isInLastCycle: boolean, isNextCycle: boolean ): MenstrualCycleDatesResponse 
	{
		return new MenstrualCycleDatesResponse(
			menstrualCycle.cycle_start_date,
			menstrualCycle.menstruation_end_date,
			menstrualCycle.ovulation_date,
			isInLastCycle,
			isNextCycle
		);
	}

	public static toDtos( menstrualCycles: MenstrualCycle[] ): MenstrualCycleDatesResponse []
	{
		const menstrualCycleDatesResponse : MenstrualCycleDatesResponse[] = [];
		for( let i = 0; i < menstrualCycles.length; i++ )
		{
			if( i === 0 )
			{
				menstrualCycleDatesResponse.push( MenstrualCycleDatesResponse.toDto( menstrualCycles[i], true, false ) );
			}
			else
			{
				menstrualCycleDatesResponse.push( MenstrualCycleDatesResponse.toDto( menstrualCycles[i], false, false ) );
			}
		}
		return menstrualCycleDatesResponse;
	}
}