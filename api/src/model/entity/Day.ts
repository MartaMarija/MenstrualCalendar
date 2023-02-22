import { Column, Entity, ManyToOne } from 'typeorm';
import { Description } from './Description';
import { TemporalEntity } from './TemporalEntity';
import { User } from './User';

@Entity()
export class Day extends TemporalEntity
{
	@ManyToOne( () => User, ( user ) => user.days, { nullable: false } )
		user: User;

	@ManyToOne( () => Description, ( description ) => description.days, {
		nullable: false,
	} )
		description: Description;

	@Column( 'date', { nullable: false } )
		date: string;
}
