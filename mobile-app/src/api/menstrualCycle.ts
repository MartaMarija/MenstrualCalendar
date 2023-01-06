import { useAuth } from '../contexts/Auth'
import apiOrigin from './api'
import { PeriodDates } from './request/PeriodDates'
import { MenstrualCycle } from './response/MenstrualCycle'

export const getMenstrualCycles = async (token: string | undefined):Promise<MenstrualCycle[]> => {
    let data
    try {
        data = await fetch(`${apiOrigin}/menstrualCycles`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
    return await data.json() as MenstrualCycle[];
}

export const showLoginOptions = async (token: string | undefined, date: string, route: string):Promise<boolean> => {
    let data
    try {
        data = await fetch(`${apiOrigin}/menstrualCycles/${route}/${date}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
    return await data.json() as boolean;
}
