import { Column, Entity, ManyToOne } from 'typeorm';
import { TemporalEntity } from './TemporalEntity';
import { User } from './User';

@Entity()
export class RefreshToken extends TemporalEntity
{
	@Column( 'varchar', { nullable: false } )
		refresh_token: string;

	@ManyToOne( () => User, ( user ) => user.days, { nullable: false } )
		user: User;
}