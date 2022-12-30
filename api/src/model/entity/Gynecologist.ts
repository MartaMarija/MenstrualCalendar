import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MedicalExam } from "./MedicalExam";
import { User } from "./User";

@Entity()
export class Gynecologist {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 45, nullable: false })
  firstName: string;

  @Column("varchar", { length: 45 })
  lastName: string;

  @Column("varchar", { length: 20 })
  telephone: string;

  @Column("varchar", { length: 60 })
  address: string;

  @OneToMany(() => User, (user) => user.gynecologists)
  user: User;

  @ManyToOne(() => MedicalExam, (medicalExam) => medicalExam.gynecologist)
  medicalExams: MedicalExam[];
}
