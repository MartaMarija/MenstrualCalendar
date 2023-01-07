import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { DateData } from 'react-native-calendars'
import { showLoginOptions, updateDatabase } from '../api/menstrualCycle'
import { MenstrualCycle } from '../api/response/MenstrualCycle'
import { useAuth } from '../contexts/Auth'

interface Props {
    date: DateData;
    pressed: boolean;
    setPressed: (pressed: boolean | ((prevCityId: boolean) => boolean)) => void;
}

const OptionList: React.FC<Props> = ({ date, pressed, setPressed }) => {
    const auth = useAuth()
    const [menstrualCyclesList, setMenstrualCyclesList] = useState<
        MenstrualCycle[] | null
    >(null)
    const [showRemovePeriod, setShowRemovePeriod] = useState(false)
    const [showEndPeriod, setShowEndPeriod] = useState(false)
    const [showAddPeriod, setShowAddPeriod] = useState(false)

    function fromDateDataToString() {
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
                fromDateDataToString(),
                'optionRemovePeriod'
            )
            setShowRemovePeriod(showRemovePeriod)
            const showEndPeriod: boolean = await showLoginOptions(
                auth.authData?.token,
                fromDateDataToString(),
                'optionEndPeriod'
            )
            setShowEndPeriod(showEndPeriod)
            const showAddPeriod: boolean = await showLoginOptions(
                auth.authData?.token,
                fromDateDataToString(),
                'optionAddPeriod'
            )
            setShowAddPeriod(showAddPeriod)
        })()
    }, [date])


    async function choosenOption(route:string) {
        const data = await updateDatabase(auth.authData?.token,
            fromDateDataToString(),
            route);
        console.log(data);
        setPressed(false);
      }

    return (
        <View style={styles.container}>
            {/* onPress={() => {pozovi funkcije koje rade ovo} */}
            {showAddPeriod && <Text style={styles.font} onPress={() => choosenOption('addPeriod')}>Add period</Text>}
            {showEndPeriod && <Text style={styles.font} onPress={() => choosenOption('endPeriod')}>End period</Text>}
            {showRemovePeriod && <Text style={styles.font} onPress={() => choosenOption('removePeriod')}>Remove period</Text>}
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
