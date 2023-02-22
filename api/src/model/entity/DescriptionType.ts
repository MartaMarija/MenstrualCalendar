import { Entity, Column, OneToMany } from 'typeorm';
import { Description } from './Description';
import { TemporalEntity } from './TemporalEntity';

@Entity()
export class DescriptionType extends TemporalEntity
{
	@Column( 'varchar', { length: 25, nullable: false } )
		name: string;

	@OneToMany( () => Description, ( description ) => description.descriptionType )
		descriptions: Description[];

	constructor( name: string, description: Description[] ) 
	{
		super();
		this.name = name;
		this.descriptions = description;
	}
}
