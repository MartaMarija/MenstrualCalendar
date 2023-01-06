import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { DateData } from 'react-native-calendars'
import { showLoginOptions } from '../api/menstrualCycle'
import { MenstrualCycle } from '../api/response/MenstrualCycle'
import { useAuth } from '../contexts/Auth'

interface Props {
    date: DateData
}

const OptionList: React.FC<Props> = ({ date }) => {
    const auth = useAuth()
    const [menstrualCyclesList, setMenstrualCyclesList] = useState<
        MenstrualCycle[] | null
    >(null)
    const [showStartPeriod, setshowStartPeriod] = useState(false)
    const [showRemovePeriod, setShowRemovePeriod] = useState(false)
    const [showEndPeriod, setShowEndPeriod] = useState(false)
    const [showAddPeriod, setShowAddPeriod] = useState(false)

    function fromDateDataToString(date: DateData) {
        let month: string = date.month.toString()
        let day: string = date.day.toString()
        if (month.length == 1) {
            month = '0' + month
        }
        if (day.length == 1) {
            day = '0' + day
        }
        return `${date.year}-${month}-${day}`
    }

    useEffect(() => {
        ;(async () => {
            const showRemovePeriod: boolean = await showLoginOptions(
                auth.authData?.token,
                fromDateDataToString(date),
                'optionRemovePeriod'
            )
            setShowRemovePeriod(showRemovePeriod)
            const showEndPeriod: boolean = await showLoginOptions(
                auth.authData?.token,
                fromDateDataToString(date),
                'optionEndPeriod'
            )
            setShowEndPeriod(showEndPeriod)
            const showAddPeriod: boolean = await showLoginOptions(
                auth.authData?.token,
                fromDateDataToString(date),
                'optionAddPeriod'
            )
            setShowAddPeriod(showAddPeriod)
        })()
    }, [date])

    return (
        <View style={styles.container}>
            {/* onPress={() => {pozovi funkcije koje rade ovo} */}
            {showAddPeriod && <Text style={styles.font}>Start period</Text>}
            {showEndPeriod && <Text style={styles.font}>End period</Text>}
            {showRemovePeriod && <Text style={styles.font}>Remove period</Text>}
            <Text style={styles.font}>Add description</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        padding: 18,
        borderRadius: 20,
    },
    font: {
        fontSize: 20,
        padding: 5,
        color: 'white',
    },
})

export default OptionList
