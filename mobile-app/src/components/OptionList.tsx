// import { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { DateData } from 'react-native-calendars';
// import { updateDatabase } from '../api/menstrualCycle';

// interface Props {
//     date: DateData
//     setPressed: ( pressed: boolean | ( ( prevCityId: boolean ) => boolean ) ) => void
//     eslint-disable-next-line @typescript-eslint/ban-types
//     getDateSettings: Function
// }

// const OptionList: React.FC<Props> = ( {
// 	date,
// 	setPressed,
// 	getDateSettings,
// } ) => 
// {
// 	const [showRemovePeriod, setShowRemovePeriod] = useState( false );
// 	const [showEndPeriod, setShowEndPeriod] = useState( false );
// 	const [showAddPeriod, setShowAddPeriod] = useState( false );

// 	function fromDateDataToString() 
// 	{
// 		let month: string = date.month.toString();
// 		let day: string = date.day.toString();
// 		if ( month.length == 1 ) 
// 		{
// 			month = '0' + month;
// 		}
// 		if ( day.length == 1 ) 
// 		{
// 			day = '0' + day;
// 		}
// 		return `${date.year}-${month}-${day}`;
// 	}

// 	useEffect( () => 
// 	{
// 		( async () => 
// 		{
// 			const showRemovePeriod: boolean = await showLoginOptions(
// 				fromDateDataToString(),
// 				'optionRemovePeriod'
// 			);
// 			setShowRemovePeriod( showRemovePeriod );
// 			const showEndPeriod: boolean = await showLoginOptions(
// 				fromDateDataToString(),
// 				'optionEndPeriod'
// 			);
// 			setShowEndPeriod( showEndPeriod );
// 			const showAddPeriod: boolean = await showLoginOptions(
// 				fromDateDataToString(),
// 				'optionAddPeriod'
// 			);
// 			setShowAddPeriod( showAddPeriod );
// 		} )();
// 	}, [date] );

// 	async function choosenOption( route: string ) 
// 	{
// 		await updateDatabase( fromDateDataToString(),
// 			route
// 		);
// 		setPressed( false );
// 		getDateSettings();
// 	}

// 	return (
// 		<View style={styles.container}>
// 			{showAddPeriod && (
// 				<Text
// 					style={styles.font}
// 					onPress={() => choosenOption( 'addPeriod' )}
// 				>
//                     Add period
// 				</Text>
// 			)}
// 			{showEndPeriod && (
// 				<Text
// 					style={styles.font}
// 					onPress={() => choosenOption( 'endPeriod' )}
// 				>
//                     End period
// 				</Text>
// 			)}
// 			{showRemovePeriod && (
// 				<Text
// 					style={styles.font}
// 					onPress={() => choosenOption( 'removePeriod' )}
// 				>
//                     Remove period
// 				</Text>
// 			)}
// 			<Text style={styles.font}>Add description</Text>
// 		</View>
// 	);
// };

// const styles = StyleSheet.create( {
// 	container: {
// 		backgroundColor: '#D31D1D',
// 		padding: 18,
// 		borderRadius: 20,
// 	},
// 	font: {
// 		fontSize: 20,
// 		padding: 5,
// 		color: 'white',
// 	},
// } );

// export default OptionList;
