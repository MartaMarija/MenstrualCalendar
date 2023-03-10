import {
	Column,
	Entity,
	ManyToOne
} from 'typeorm';
import { Gynecologist } from './Gynecologist';
import { TemporalEntity } from './TemporalEntity';
import { User } from './User';

@Entity()
export class MedicalExam extends TemporalEntity
{
	@Column( 'date' )
		date: Date;

	@Column( 'varchar', { length: 200 } )
		description: string;

	@ManyToOne( () => Gynecologist, ( gynecologist ) => gynecologist.medicalExams )
		gynecologist: Gynecologist | null;

	@ManyToOne( () => User, ( user ) => user.medicalExams )
		user: User;

	constructor(
		date: Date,
		description: string,
		gynecologist: Gynecologist | null,
		user: User
	) 
	{
		super();
		this.date = date;
		this.description = description;
		this.gynecologist = gynecologist;
		this.user = user;
	}
}
