import { Gynecologist } from '../entity/Gynecologist';

export class GynecologistResponse 
{
	constructor(
		public id: string,
		public first_name: string,
		public last_name: string,
		public telephone: string,
		public address: string
	) 
	{}

	public static toDto( gyn: Gynecologist ): GynecologistResponse 
	{
		return new GynecologistResponse(
			gyn.id,
			gyn.first_name,
			gyn.last_name,
			gyn.telephone,
			gyn.address
		);
	}

	public static toDtos( gyns: Gynecologist[] ): GynecologistResponse[]
	{
		const gynResponse: GynecologistResponse[] = [];
		gyns.forEach( ( gyn: Gynecologist ) => 
		{
			gynResponse.push( GynecologistResponse.toDto( gyn ) );
		} );
		return gynResponse;
	}
}