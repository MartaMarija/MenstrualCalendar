import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DateData } from 'react-native-calendars';
import { MenstrualCycleDates } from '../api/response/MenstrualCycleDates';

interface Props {
    pressedDate: DateData,
    lastMenstrualCycleDates: MenstrualCycleDates,
    setIsPressed: ( isPressed: boolean | ( ( prevIsPressed: boolean ) => boolean ) ) => void
    addPeriod: ( pressedDate : string ) => void
    removePeriod: () => void
}

const OptionList: React.FC<Props> = ( { pressedDate, lastMenstrualCycleDates, setIsPressed, addPeriod, removePeriod } ) => 
{
	const [showRemovePeriod, setShowRemovePeriod] = useState( false );
	const [showEndPeriod, setShowEndPeriod] = useState( false );
	const [showAddPeriod, setShowAddPeriod] = useState( false );

	useEffect( () => 
	{
		canAddPeriod();
		canRemovePeriod();
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
		if( !lastMenstrualCycleDates )
		{
			setShowAddPeriod( true );
			return;
		}
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

	function canRemovePeriod()
	{
		if ( !lastMenstrualCycleDates )
		{
			return;
		}
		const pressedDateString : string = convertPressedDatefromDateDataToString();
		const pressedDate : Date = new Date( pressedDateString );
		const cycleStartDate = new Date( lastMenstrualCycleDates.cycleStart );
		const cycleEndDate = new Date( lastMenstrualCycleDates.cycleEnd );
		if ( pressedDate.getTime() === cycleStartDate.getTime()
            || pressedDate.getTime() === cycleEndDate.getTime() )
		{
			setShowRemovePeriod( true );
			return;
		}
		const dateBetween = cycleStartDate;
		dateBetween.setDate( dateBetween.getDate() + 1 );
		while ( dateBetween < new Date( cycleEndDate ) ) 
		{
			if ( pressedDate.getTime() === dateBetween.getTime() )
			{
				setShowRemovePeriod( true );
				return;
			}
			dateBetween.setDate( dateBetween.getDate() + 1 );
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
			)} */}
			{showRemovePeriod && (
				<Text 
					style={styles.font} 
					onPress={() => 
					{
						setIsPressed( false );
						removePeriod();
					}} >
					Remove period
				</Text>
			)}
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
