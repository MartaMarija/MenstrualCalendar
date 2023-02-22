import {
	Entity,
	Column,
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { Day } from './Day';
import { DescriptionType } from './DescriptionType';
import { TemporalEntity } from './TemporalEntity';

@Entity()
export class Description extends TemporalEntity
{
	@Column( 'varchar', { length: 25, nullable: false } )
		name: string;

	@ManyToOne( () => DescriptionType, ( type ) => type.descriptions )
		descriptionType: DescriptionType;

	@OneToMany( () => Day, ( day ) => day.description )
		days: Day[];

	constructor( name: string, descriptionType: DescriptionType ) 
	{
		super();
		this.name = name;
		this.descriptionType = descriptionType;
	}
}
