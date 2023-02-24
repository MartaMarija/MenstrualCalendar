import { Gynecologist } from '../entity/Gynecologist';
import { User } from '../entity/User';

export class GynecologistCreateRequest 
{
	constructor(
      public first_name: string,
      public last_name: string,
      public telephone: string,
      public address: string
	) 
	{}
  
	public static async toEntity( gynecologistCreateRequest: GynecologistCreateRequest, user: User ): Promise<Gynecologist> 
	{
		return new Gynecologist(
			gynecologistCreateRequest.first_name,
			gynecologistCreateRequest.last_name,
			gynecologistCreateRequest.telephone,
			gynecologistCreateRequest.address,
			user
		);
	}
}