import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class MenstrualCycle {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("int")
  cycle_duration: number;

  @Column("int")
  menstruation_duration: number;

  @Column("int")
  luteal_phase_duration: number;

  @Column("date")
  cycle_start_date: Date;

  @Column("date")
  menstruation_end_date: Date;

  @Column("date")
  ovulation_date: Date;

  @ManyToOne(() => User, (user) => user.menstrualCycles)
  user: User;
}
