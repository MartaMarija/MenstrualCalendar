import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DateData } from 'react-native-calendars';
import { MenstrualCycleDates } from '../api/response/MenstrualCycleDates';

interface Props {
    pressedDate: DateData,
    menstrualCycleDates: MenstrualCycleDates[],
    setIsPressed: ( isPressed: boolean | ( ( prevIsPressed: boolean ) => boolean ) ) => void
    addPeriod: ( pressedDate : string ) => void
}

const OptionList: React.FC<Props> = ( { pressedDate, menstrualCycleDates, setIsPressed, addPeriod } ) => 
{
	const [showRemovePeriod, setShowRemovePeriod] = useState( false );
	const [showEndPeriod, setShowEndPeriod] = useState( false );
	const [showAddPeriod, setShowAddPeriod] = useState( false );

	useEffect( () => 
	{
		canAddPeriod();
	}, [] );
    

	function convertPressedDatefromDateDataToString() 
	{
		let month: string = pressedDate.month.toString();
		let day: string = pressedDate.day.toString();
		if ( month.length == 1 ) 
		{
			month = '0' + month;
		}
		if ( day.length == 1 ) 
		{
			day = '0' + day;
		}
		return `${pressedDate.year}-${month}-${day}`;
	}

	function canAddPeriod()
	{
		if( !menstrualCycleDates )
		{
			setShowAddPeriod( true );
			return;
		}
		const lastMenstrualCycleDates = menstrualCycleDates
			.find( menstrualCycleDate => menstrualCycleDate.isInLastCycle );
		if( lastMenstrualCycleDates )
		{
			const lastCycleStartDate = new Date( lastMenstrualCycleDates.cycleStart );
			lastCycleStartDate.setDate( lastCycleStartDate.getDate() + 13 );
			const today = new Date();
			const pressedDateString : string = convertPressedDatefromDateDataToString();
			const pressedDate : Date = new Date( pressedDateString );
			if ( pressedDate >= lastCycleStartDate && pressedDate <= today ) 
			{
				setShowAddPeriod( true );
			}
		}
	}

	return (
		<View style={styles.container}>
			{showAddPeriod && (
				<Text 
					style={styles.font} 
					onPress={() => 
					{
						setIsPressed( false );
						addPeriod( convertPressedDatefromDateDataToString() );
					}} >
                    Add period
				</Text>
			)}
			{/* {showEndPeriod && (
				<Text style={styles.font} onPress={() => choosenOption( 'endPeriod' )} >
                    End period
				</Text>
			)}
			{showRemovePeriod && (
				<Text style={styles.font} onPress={() => choosenOption( 'removePeriod' )} >
                    Remove period
				</Text>
			)} */}
			{/* TODO onPress addDescription */}
			<Text style={styles.font}>Add description</Text>
		</View>
	);
};

const styles = StyleSheet.create( {
	container: {
		backgroundColor: '#D31D1D',
		padding: 18,
		borderRadius: 20,
	},
	font: {
		fontSize: 20,
		padding: 5,
		color: 'white',
	},
} );

export default OptionList;
