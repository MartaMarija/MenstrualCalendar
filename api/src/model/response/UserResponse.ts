import { User } from '../entity/User';

export class UserResponse 
{
	constructor(
        public id: string,
        public first_name: string,
        public last_name: string,
        public email: string,
        public avg_duration_of_menstrual_cycle: number,
        public avg_duration_of_luteal_phase: number,
        public avg_duration_of_menstruation: number,
	) 
	{}

	public static toDto( user: User ): UserResponse 
	{
		return new UserResponse(
			user.id,
			user.first_name,
			user.last_name,
			user.email,
			user.avg_duration_of_menstrual_cycle,
			user.avg_duration_of_luteal_phase,
			user.avg_duration_of_menstruation
		);
	}

	public static toDtos( users: User[] ): UserResponse[] 
	{
		const userResponses: UserResponse[] = [];
		users.forEach( ( user: User ) => 
		{
			userResponses.push( UserResponse.toDto( user ) );
		} );
		return userResponses;
	}
}