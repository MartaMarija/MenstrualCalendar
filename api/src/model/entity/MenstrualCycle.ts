import { Column, Entity, ManyToOne } from 'typeorm';
import { TemporalEntity } from './TemporalEntity';
import { User } from './User';

@Entity()
export class MenstrualCycle extends TemporalEntity
{
	@Column( 'int' )
		cycle_duration: number;

	@Column( 'int' )
		menstruation_duration: number;

	@Column( 'int' )
		luteal_phase_duration: number;

	@Column( 'date' )
		cycle_start_date: Date;

	@Column( 'date' )
		menstruation_end_date: Date;

	@Column( 'date' )
		ovulation_date: Date;

	@ManyToOne( () => User, ( user ) => user.menstrualCycles )
		user: User;

	constructor(
		id?: string,
		periodEndDate?: Date,
		cycleStartDate?: Date,
		user?: User
	) 
	{
		super();
		if( id )
		{
			this.id = id;
		}
		if( periodEndDate )
		{
			this.menstruation_end_date = periodEndDate;
		}
		if( cycleStartDate )
		{
			this.cycle_start_date = cycleStartDate;
		}
		if( user )
		{
			this.user = user;
		}
	}
}
