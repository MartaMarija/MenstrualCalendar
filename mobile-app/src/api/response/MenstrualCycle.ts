export type MenstrualCycle = {
    id: string
    cycle_duration: number
    menstruation_duration: number
    luteal_phase_duration: number
    cycle_start_date: Date
    menstruation_end_date: Date
    ovulation_date: Date
}
