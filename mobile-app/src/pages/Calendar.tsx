import { useEffect, useState } from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { Calendar, DateData } from 'react-native-calendars'
import { MarkedDates } from 'react-native-calendars/src/types'
import { getDateSetting } from '../api/menstrualCycle'
import { DateSettings } from '../api/response/DateSettings'
import OptionList from '../components/OptionList'
import { useAuth } from '../contexts/Auth'

const screen = Dimensions.get('window')

const CalendarScreen = () => {
    const auth = useAuth()
    const [pressed, setPressed] = useState(false)
    const [dayPressed, setDayPressed] = useState<DateData>()
    const [markedDatesArray, setMarkedDatesArray] = useState<MarkedDates>()

    useEffect(() => {
        ;(async () => {
            getDateSettings()
        })()
    }, [])

    async function getDateSettings() {
        const dateSettings: DateSettings[] = await getDateSetting(
            auth.authData?.token
        )
        if (dateSettings) {
            let markedDates: MarkedDates = {}
            for (let i = 0; i < dateSettings.length; i++) {
                markedDates[dateSettings[i].date] = {
                    color: dateSettings[i].color,
                    textColor: dateSettings[i].textColor,
                    startingDay: dateSettings[i].startingDay,
                    endingDay: dateSettings[i].endingDay,
                }
            }
            setMarkedDatesArray(markedDates)
        }
    }

    return (
        <View>
            <Calendar
                onDayPress={date => {
                    setDayPressed(date)
                    setPressed(true)
                }}
                markingType={'period'}
                markedDates={markedDatesArray}
                enableSwipeMonths
            />
            {pressed && (
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => setPressed(false)}
                >
                    <View style={styles.container2}>
                        <OptionList
                            date={dayPressed!}
                            pressed={pressed}
                            setPressed={setPressed}
                            getDateSettings={getDateSettings}
                        />
                    </View>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: screen.width,
        height: screen.height - 100,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    container2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default CalendarScreen
