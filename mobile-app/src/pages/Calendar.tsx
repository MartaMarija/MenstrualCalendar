import { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import { getMenstrualCycleDates, insertMenstrualCycle, deleteMenstrualCycle, updateMenstrualCycle } from '../api/menstrualCycle';
import { MenstrualCycleDates } from '../api/response/MenstrualCycleDates';
import OptionList from '../components/OptionList';

const screen = Dimensions.get( 'window' );

const CalendarScreen = () => 
{
	const [isPressed, setIsPressed] = useState( false );
	const [pressedDate, setPressedDate] = useState<DateData>();
	const [markedDatesArray, setMarkedDatesArray] = useState<MarkedDates>();
	const [lastMenstrualCycleDates, setLastMenstrualCycleDates] = useState<MenstrualCycleDates>();

	useEffect( () => 
	{
		( async () => 
		{
			await getDateSettings();
		} )();
	}, [] );

	async function getDateSettings() 
	{
		const response = await getMenstrualCycleDates();
		//check error
		if ( response ) 
		{
			const lastMenstrualCycleDates = response
				.find( menstrualCycleDate => menstrualCycleDate.isInLastCycle );
			setLastMenstrualCycleDates( lastMenstrualCycleDates );
			const markedDates: MarkedDates = {};
			const today : string = ( new Date( ) ).toISOString().substring( 0,10 );
			markedDates[today] =
			{
				'textColor': '#D31D1D'
			};
			response.forEach( menstrualCycleDates => 
			{
				if( menstrualCycleDates.cycleStart === menstrualCycleDates.cycleEnd )
				{
					markedDates[menstrualCycleDates.cycleEnd] =
					{
						'color': '#D31D1D',
						'textColor': 'white',
						'startingDay': true,
						'endingDay': true
					};
				}
				else
				{
					markedDates[menstrualCycleDates.cycleStart] =
					{
						'color': '#D31D1D',
						'textColor': 'white',
						'startingDay': true,
						'endingDay': false
					};
					markedDates[menstrualCycleDates.cycleEnd] =
					{
						'color': '#D31D1D',
						'textColor': 'white',
						'startingDay': false,
						'endingDay': true
					};
				}
				const dateBetween = new Date( menstrualCycleDates.cycleStart );
				dateBetween.setDate( dateBetween.getDate() + 1 );
				while ( dateBetween < new Date( menstrualCycleDates.cycleEnd ) ) 
				{
					const _dateBetween: string = dateBetween.toISOString().substring( 0, 10 );
					markedDates[_dateBetween] =
					{
						'color': '#D31D1D',
						'textColor': 'white',
						'startingDay': false,
						'endingDay': false
					};
					dateBetween.setDate( dateBetween.getDate() + 1 );
				}
				markedDates[menstrualCycleDates.ovulation] =
				{
					'color': '#7B287D',
					'textColor': 'white',
					'startingDay': true,
					'endingDay': true
				};
				
			} );
			const startDate : string = ( response[response.length-1].cycleStart ).substring( 0,10 );
			const endDate : string = ( response[response.length-1].cycleEnd ).substring( 0,10 );
			const ovulation : string = ( response[response.length-1].ovulation ).substring( 0,10 );
			markedDates[startDate] =
			{
				'color': '#DA5959',
				'textColor': 'white',
				'startingDay': true,
				'endingDay': false
			};
			const dateBetween = new Date( startDate );
			dateBetween.setDate( dateBetween.getDate() + 1 );
			while ( dateBetween < new Date( endDate ) ) 
			{
				const _dateBetween: string = dateBetween.toISOString().substring( 0, 10 );
				markedDates[_dateBetween] =
					{
						'color': '#DA5959',
						'textColor': 'white',
						'startingDay': false,
						'endingDay': false
					};
				dateBetween.setDate( dateBetween.getDate() + 1 );
			}
			markedDates[endDate] =
			{
				'color': '#DA5959',
				'textColor': 'white',
				'startingDay': false,
				'endingDay': true
			};
			markedDates[ovulation] =
			{
				'color': '#BE8DBF',
				'textColor': 'white',
				'startingDay': true,
				'endingDay': true
			};
			setMarkedDatesArray( markedDates );
		}
	}

	async function addPeriod( pressedDate : string ) 
	{
		const response = await insertMenstrualCycle( pressedDate );
		console.log( response );
		await getDateSettings();
	}

	async function updatePeriod( pressedDate : string ) 
	{
		const response = await updateMenstrualCycle( pressedDate );
		console.log( response );
		await getDateSettings();
	}

	async function removePeriod() 
	{
		const response = await deleteMenstrualCycle();
		console.log( response );
		await getDateSettings();
	}

	return (
		<View>
			<Calendar
				style={{ paddingLeft: 0, paddingRight: 0 }}
				onDayPress={date => 
				{
					setPressedDate( date );
					setIsPressed( true );
				}}
				markedDates={markedDatesArray}
				markingType={'period'}
				enableSwipeMonths
				theme={{
					monthTextColor: 'white',
					arrowColor: 'white',
					textSectionTitleColor: 'white',
					textMonthFontWeight: 'bold',
					textDayHeaderFontWeight: 'bold',
				}}
				headerStyle={{ backgroundColor: '#D31D1D' }}
				markingStyle={{ borderRadius: 0 }} 
				firstDay={1}
			/> 
			{isPressed && pressedDate && lastMenstrualCycleDates && (
				<TouchableOpacity
					// style={styles.container}
					onPress={() => setIsPressed( false )}
				>
					<View style={styles.container2}>
						<OptionList
							pressedDate={pressedDate}
							lastMenstrualCycleDates={lastMenstrualCycleDates}
							setIsPressed={setIsPressed}
							addPeriod={addPeriod}
							updatePeriod={updatePeriod}
							removePeriod={removePeriod}
						/>
					</View>
				</TouchableOpacity>
			)}
		</View>
	);
};

const styles = StyleSheet.create( {
	container: {
		position: 'absolute',
		width: screen.width,
		height: screen.height,
		backgroundColor: 'rgba(0,0,0,0.4)',
	},
	container2: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
} );

export default CalendarScreen;
