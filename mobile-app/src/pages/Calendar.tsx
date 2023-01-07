import { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
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

    async function getDateSettings(beginning: string, end: string) {
        const dateSettings: DateSettings[] = await getDateSetting(
            auth.authData?.token,
            beginning,
            end
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

    function fromDateToString(date:Date) {
        let month: string = (date.getMonth() + 1).toString()
        let day: string = date.getDate().toString()
        if (month.length == 1) {
            month = '0' + month
        }
        if (day.length == 1) {
            day = '0' + day
        }
        return `${date.getFullYear()}-${month}-${day}`
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
                onMonthChange={(date: DateData) => {
                    let startDate: Date = new Date(date.year, date.month - 1, 1)
                    let endDate: Date = new Date(
                        date.year,
                        date.month,
                        1
                    )
                    getDateSettings(
                        fromDateToString(startDate),
                        fromDateToString(endDate)
                    )
                }}
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
