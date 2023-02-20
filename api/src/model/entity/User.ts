import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Day } from './Day';
import { Gynecologist } from './Gynecologist';
import { MedicalExam } from './MedicalExam';
import { MenstrualCycle } from './MenstrualCycle';

@Entity()
export class User 
{
	@PrimaryGeneratedColumn('uuid')
		id: string;

	@Column('varchar', { length: 45, nullable: false })
		first_name: string;

	@Column('varchar', { length: 45, nullable: false })
		last_name: string;

	@Column('varchar', { length: 45, nullable: false, unique: true })
		email: string;

	@Column('varchar', { nullable: false }) // Defaults to 255 characters
		password: string;

	@Column('int', { nullable: false })
		avg_duration_of_menstrual_cycle: number;

	@Column('int', { nullable: false })
		avg_duration_of_menstruation: number;

	@Column('int', { nullable: false })
		avg_duration_of_luteal_phase: number;

	@OneToMany(() => Day, (day) => day.user)
		days: Day[];

	@OneToMany(() => MenstrualCycle, (menstrualCycle) => menstrualCycle.user)
		menstrualCycles: MenstrualCycle[];

	@OneToMany(() => Gynecologist, (gynecologist) => gynecologist.user)
		gynecologists: Gynecologist[];

	@OneToMany(() => MedicalExam, (medicalExam) => medicalExam.user)
		medicalExams: MedicalExam[];

	constructor(
		firstName: string,
		lastName: string,
		email: string,
		password: string,
		avgDurationOfMenstrualCycle: number,
		avgDurationOfMenstruation: number,
		avgDurationOfLutealPhase: number,
		menstrualCycles: MenstrualCycle[],
		medicalExams: MedicalExam[]
	) 
	{
		this.first_name = firstName;
		this.last_name = lastName;
		this.email = email;
		this.password = password;
		this.avg_duration_of_menstrual_cycle = avgDurationOfMenstrualCycle;
		this.avg_duration_of_menstruation = avgDurationOfMenstruation;
		this.avg_duration_of_luteal_phase = avgDurationOfLutealPhase;
		this.menstrualCycles = menstrualCycles;
		this.medicalExams = medicalExams;
	}
}
