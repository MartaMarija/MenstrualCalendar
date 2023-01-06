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
import OptionList from '../components/OptionList'

const screen = Dimensions.get('window')

const CalendarScreen = () => {
    const [pressed, setPressed] = useState(false)
    const [dayPressed, setDayPressed] = useState<DateData>()
    const [canDeletePeriod, setcanDeletePeriod] = useState(false)

    const b = {
        days: [
            {
                date: '2023-01-01',
                color: 'red',
                startingDay: 'true',
            },
            {
                date: '2023-01-02',
                color: 'red',
                startingDay: 'true',
            },
            {
                date: '2023-01-24',
                color: 'red',
                startingDay: 'true',
            },
        ],
    }

    let markedDatesArray: MarkedDates = {}

    for (let i = 0; i < b['days'].length; i++) {
        markedDatesArray[b['days'][i].date] = {
            color: b['days'][i].color,
            textColor: 'white',
        }
    }
    //console.log(markedDatesArray)

    //arr = JSON.parse(b);

    // `
    //     '2023-01-11': {
    //         startingDay: true,
    //         color: 'red',
    //         textColor: 'white',
    //     },
    //     '2023-01-13': {
    //         endingDay: true,
    //         color: 'red',
    //         textColor: 'white',
    //     },
    //     '2023-01-12': {
    //         color: 'red',
    //         textColor: 'white',
    //     },
    //     '2023-01-24':{
    //         startingDay: true,
    //         endingDay: true,
    //         color: '#F564A9',
    //         textColor: 'white'
    //     }
    // `;



    return (
        <View>
            <Calendar
                onDayPress={date => {
                    // const date : string = `${day.year}-${day.month}-${day.day}`;
                    // for (let i = 0; i < b['days'].length; i++) {
                    //     if(b['days'][i].date == date && b['days'][i].startingDay == 'true')
                    //     {
                    //         setcanDeletePeriod(true)
                    //     }
                    // }
                    setDayPressed(date)
                    setPressed(true)
                }}
                markingType={'period'}
                markedDates={markedDatesArray}
                onMonthChange={(date: DateData) => {
                    //Moram uzeti raspon od 2 mjeseca. Trenutni i prethodni
                    // let begginigMonth = date.month - 1
                    // if (begginigMonth == 0) {
                    //     let month = '12'
                    //     let year = date.year - 1
                    //     console.log('\nPOČETAK: ' + year + '-' + month + '-01')
                    // } else {
                    //     console.log(
                    //         '\nPOČETAK: ' +
                    //             date.year +
                    //             '-' +
                    //             begginigMonth +
                    //             '-01'
                    //     )
                    // }

                    // if (date.month + 1 == 13) {
                    //     let month = '01'
                    //     let year = date.year + 1
                    //     console.log(year + '-' + month + '-01')
                    // } else {
                    //     let month = date.month + 1
                    //     if (month.toString().length == 1) {
                    //         console.log(date.year + '-' + 0 + month + '-01')
                    //     } else {
                    //         console.log(date.year + '-' + month + '-01')
                    //     }
                    // }
                }}
            />
            {pressed && (
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => setPressed(false)}
                >
                    <View style={styles.container2}>
                        <OptionList date={dayPressed!} />
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
