import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm'
import { Day } from './Day'
import { DescriptionType } from './DescriptionType'

@Entity()
export class Description {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { length: 25, nullable: false })
    name: string

    @ManyToOne(() => DescriptionType, type => type.descriptions)
    descriptionType: DescriptionType

    @OneToMany(() => Day, day => day.description)
    days: Day[]

    constructor(name: string, descriptionType: DescriptionType) {
        this.name = name
        this.descriptionType = descriptionType
    }
}
