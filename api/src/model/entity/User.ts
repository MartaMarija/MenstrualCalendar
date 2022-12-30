import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Day } from "./Day";
import { Gynecologist } from "./Gynecologist";
import { MedicalExam } from "./MedicalExam";
import { MenstrualCycle } from "./MenstrualCycle";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 45, nullable: false })
  firstName: string;

  @Column("varchar", { length: 45, nullable: false })
  lastName: string;

  @Column("varchar", { length: 45, nullable: false, unique: true })
  email: string;

  @Column("varchar", { nullable: false }) // Defaults to 255 characters
  password: string;

  @Column("int", { nullable: false })
  avgDurationOfMenstrualCycle: number;

  @Column("int", { nullable: false })
  avgDurationOfMenstruation: number;

  @Column("int", { nullable: false })
  avgDurationOfLutealPhase: number;

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
    avgDurationOfLutealPhase: number
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.avgDurationOfMenstrualCycle = avgDurationOfMenstrualCycle;
    this.avgDurationOfMenstruation = avgDurationOfMenstruation;
    this.avgDurationOfLutealPhase = avgDurationOfLutealPhase;
  }
}
