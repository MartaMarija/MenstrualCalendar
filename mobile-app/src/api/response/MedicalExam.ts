import { Gynecologist } from './Gynecologist';

export type MedicalExam = {
    id: string
    date: Date
    description: string
    gynecologist: Gynecologist
}
