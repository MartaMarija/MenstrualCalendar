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
  first_name: string;

  @Column("varchar", { length: 45 })
  last_name: string;

  @Column("varchar", { length: 20 })
  telephone: string;

  @Column("varchar", { length: 60 })
  address: string;

  @OneToMany(() => User, (user) => user.gynecologists)
  user: User;

  @OneToMany(() => MedicalExam, (medicalExam) => medicalExam.gynecologist)
  medicalExams: MedicalExam[];
}
