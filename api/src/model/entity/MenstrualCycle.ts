import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class MenstrualCycle {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('int')
    cycleDuration: number

    @Column('int')
    menstruationDuration: number

    @Column('int')
    lutealPhaseDuration: number

    @Column('date')
    cycleStartDate: Date

    @ManyToOne(()=> User, user=>user.menstrualCycles)
    user: User
}