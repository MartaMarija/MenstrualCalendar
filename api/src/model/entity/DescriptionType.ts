import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Description } from './Description';

@Entity()
export class DescriptionType 
{
	@PrimaryGeneratedColumn( 'uuid' )
		id: string;

	@Column( 'varchar', { length: 25, nullable: false } )
		name: string;

	@OneToMany( () => Description, ( description ) => description.descriptionType )
		descriptions: Description[];

	constructor( name: string, description: Description[] ) 
	{
		this.name = name;
		this.descriptions = description;
	}
}
