import apiOrigin from './api'
import { Gynecologist } from './response/Gynecologist'

export const insertGynecologist = async (
    token: string | undefined,
    gynData: Gynecologist
): Promise<boolean> => {
    let data
    try {
        data = await fetch(`${apiOrigin}/gyn/addGyn`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({
                firstName: gynData.firstName,
                lastName: gynData.lastName,
                telephone: gynData.telephone,
                address: gynData.address,
            }),
        })
    } catch (error) {
        console.log(error)
        throw error
    }
    return (await data.json()) as boolean
}
