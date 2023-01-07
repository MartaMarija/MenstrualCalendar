import apiOrigin from './api'
import { MedicalExam } from './response/MedicalExam'

export const getMedicalExams = async (
    token: string | undefined
): Promise<MedicalExam[]> => {
    let data
    try {
        data = await fetch(`${apiOrigin}/medicalExams`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
    } catch (error) {
        console.log(error)
        throw error
    }
    return (await data.json()) as MedicalExam[]
}
