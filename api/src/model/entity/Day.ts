import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Description } from './Description';
import { User } from './User';

@Entity()
export class Day 
{
	@PrimaryGeneratedColumn('uuid')
		id: string;

	@ManyToOne(() => User, (user) => user.days, { nullable: false })
		user: User;

	@ManyToOne(() => Description, (description) => description.days, {
		nullable: false,
	})
		description: Description;

	@Column('date', { nullable: false })
		date: string;
}
