import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Gynecologist } from "./Gynecologist";
import { User } from "./User";

@Entity()
export class MedicalExam {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("date")
  date: Date;

  @Column("varchar", { length: 200 })
  description: string;

  @ManyToOne(() => Gynecologist, (gynecologist) => gynecologist.medicalExams)
  gynecologist: Gynecologist | null;

  @ManyToOne(() => User, (user) => user.medicalExams)
  user: User;
}
