import { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import { Calendar, DateData } from 'react-native-calendars'
import OptionList from '../components/OptionList'

const screen = Dimensions.get('window')

const CalendarScreen = () => {
    const [pressed, setPressed] = useState(false)
    const [dayPressed, setDayPressed] = useState<DateData>()

    return (
        <View>
            <Calendar
                onDayLongPress={day => {
                    setDayPressed(day)
                    setPressed(true)
                }}
                markingType={'period'}
                markedDates={{
                    '2023-01-11': {
                        startingDay: true,
                        color: 'red',
                        textColor: 'white',
                    },
                    '2023-01-13': {
                        endingDay: true,
                        color: 'red',
                        textColor: 'white',
                    },
                    '2023-01-12': {
                        color: 'red',
                        textColor: 'white',
                    },
                    '2023-01-24':{
                        startingDay: true,
                        endingDay: true,
                        color: '#F564A9',
                        textColor: 'white'
                    }
                }}
            />
            {pressed && (
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => setPressed(false)}
                >
                    <View style={styles.container2}>
                        <OptionList day={dayPressed!} />
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
