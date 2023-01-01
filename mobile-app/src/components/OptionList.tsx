import { View, Text, StyleSheet } from 'react-native'
import { DateData } from 'react-native-calendars';

interface Props {
    day: DateData;
  }

const OptionList: React.FC<Props> = ({day}) => {

    
    return (
        <View style={styles.container}> 
            <Text style={styles.font}>Start period</Text>
            <Text style={styles.font}>End period</Text>
            <Text style={styles.font}>Add description</Text>
        </View>
    );
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
        color: 'white'
    }
})

export default OptionList;
