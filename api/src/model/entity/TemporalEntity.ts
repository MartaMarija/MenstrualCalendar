import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class TemporalEntity 
{
	@PrimaryGeneratedColumn( 'uuid' )
		id: string;

	@CreateDateColumn()
		createdAt: Date;
    
	@UpdateDateColumn()
		updatedAt: Date;
        
	@DeleteDateColumn()
		deletedAt: Date;
}