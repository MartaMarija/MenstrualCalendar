import { useAuth } from '../contexts/Auth'
import apiOrigin from './api'
import { PeriodDates } from './request/PeriodDates'
import { DateSettings } from './response/DateSettings'
import { MenstrualCycle } from './response/MenstrualCycle'

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

export const updateDatabase = async (token: string | undefined, date: string, route: string):Promise<boolean> => {
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

export const getDateSetting =async (token:string | undefined, beginning: string, end : string): Promise<DateSettings[]> => {
    let data
    try {
        data = await fetch(`${apiOrigin}/menstrualCycles/dates/${beginning}/${end}`, {
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
    return await data.json() as DateSettings[];
}
