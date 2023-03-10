import {
	Column,
	Entity,
	ManyToOne,
	OneToMany
} from 'typeorm';
import { MedicalExam } from './MedicalExam';
import { TemporalEntity } from './TemporalEntity';
import { User } from './User';

@Entity()
export class Gynecologist extends TemporalEntity
{
	@Column( 'varchar', { length: 45, nullable: false } )
		first_name: string;

	@Column( 'varchar', { length: 45 } )
		last_name: string;

	@Column( 'varchar', { length: 20 } )
		telephone: string;

	@Column( 'varchar', { length: 60 } )
		address: string;

	@ManyToOne( () => User, ( user ) => user.gynecologists )
		user: User;

	@OneToMany( () => MedicalExam, ( medicalExam ) => medicalExam.gynecologist )
		medicalExams: MedicalExam[];

	constructor(
		first_name: string,
		last_name: string,
		telephone: string,
		address: string,
		user: User
	) 
	{
		super();
		this.first_name = first_name;
		this.last_name = last_name;
		this.telephone = telephone;
		this.address = address;
		this.user = user;
	}
}
