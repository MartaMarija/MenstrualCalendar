import { Formik } from 'formik';
import {
	Pressable,
	TextInput,
	View,
	Text,
	StyleSheet,
	Modal,
	Dimensions,
	Image,
	TouchableOpacity,
	ScrollView
} from 'react-native';
import { insertMedicalExam } from '../api/medicalExam';
import { getGynecologists } from '../api/gynecologist';
import { MedicalExam } from '../api/response/MedicalExam';
import { Gynecologist } from '../api/response/Gynecologist';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { Calendar, DateData } from 'react-native-calendars';
import ImageButton from './ImageButton';

interface Props {
    setAddMedicalExam: (
        pressed: boolean | ( ( prevPressed: boolean ) => boolean )
    ) => void
}

const screen = Dimensions.get( 'window' );

const AddMedicalExam: React.FC<Props> = ( { setAddMedicalExam } ) => 
{
	const [gynecologists, setGynecologists] = useState<Gynecologist[]>();
	const [error, setError] = useState( '' );
	const [showCalendar, setShowCalendar] = useState( false );

	useEffect( () => 
	{
		( async () => 
		{
			const gynecologists = await getGynecologists();
			setGynecologists( gynecologists );
		} )();
	}, [] );

	async function submit( values: MedicalExam ) 
	{
		const response = await insertMedicalExam( values ).catch( ( error )=>
		{
			switch( error.response.status )
			{
			case 400:
				setError( 'Description is required!' );
				break;
			case 500:
				setError( 'Internal server error!' );
				break;
			default:
				setError( 'Unknown error occured!' );
				break;
			}
		} );
		if ( response )
		{
			setAddMedicalExam( false );
		}
	}

	return (
		<Modal>
			{gynecologists && (
				<ScrollView>
					<Formik
						initialValues={{
							id: '',
							date: new Date(),
							description: '',
							gynecologist: {
								id: gynecologists[0] ? gynecologists[0].id : '',
								first_name: gynecologists[0] ? gynecologists[0].first_name : '',
								last_name: gynecologists[0] ? gynecologists[0].last_name : '',
								address: gynecologists[0] ? gynecologists[0].address : '',
								telephone: gynecologists[0] ? gynecologists[0].telephone : '',
							},
						}}
						onSubmit={( values: MedicalExam ) => 
						{
							values.gynecologist.id = values.gynecologist ? values.gynecologist.id : '';
							submit( values );
						}}
					>
						{props => (
							<View style={styles.containerMain}>
								<View style={styles.titleBackground}>
									<Text style={styles.titleText}> Add a medical exam </Text>
									<Pressable onPress={() => setAddMedicalExam( false )}>
										<Image source={require( '../assets/ExitX.png' )} 
											style={{ width: 20, height: 20, }} />
									</Pressable>
								</View>
								<View style={styles.containerInputs}>
									<View style={stylesInputBox.container}>
										<Text style={stylesInputBox.label}>Date</Text>
										<View style={stylesInputBox.inlineIcon}>
											<TextInput 
												style={[stylesInputBox.input, { color: '#999393' }]}
												value={props.values.date instanceof Date ? 
													props.values.date.toISOString().substring( 0, 10 ) :
													( props.values.date as DateData ).toString()
												}
												editable={false}
											/>
											<TouchableOpacity onPress={ ()=>
											{
												showCalendar ? setShowCalendar( false ) : setShowCalendar( true );
											}}>
												<Image source={require( '../assets/CalendarRed.png' )} 
													style={{ width: 25, height: 27, }} />
											</TouchableOpacity>
										</View>
									</View>
									{showCalendar &&
									<View style={styles.calendar}>
										<Calendar
											markedDates={{ 
												[props.values.date.toString()]: 
													{ selected: true, selectedTextColor: 'white', selectedColor: '#D31D1D' },	
											}}
											style={{ paddingLeft: 0, paddingRight: 0 }}
											onDayPress={( day ) => 
											{
												props.setFieldValue( 'date', day.dateString );
											}}
											enableSwipeMonths
											theme={{
												monthTextColor: 'white',
												arrowColor: 'white',
												textSectionTitleColor: 'white',
												textMonthFontWeight: 'bold',
												textDayHeaderFontWeight: 'bold',
												todayTextColor: '#D31D1D',
											}}
											headerStyle={{ backgroundColor: '#D31D1D' }}
										/>
									</View>
									}
									<View style={stylesInputBox.container}>
										<Text style={stylesInputBox.label}>Description</Text>
										<TextInput 
											style={stylesInputBox.input}
											value={props.values.description}
											onChangeText={props.handleChange( 'description' )}
											onBlur={props.handleBlur( 'description' )}
											selectionColor='#D31D1D'
										/>
									</View>
									<View style={[stylesInputBox.container, { padding: 0, flex: 1, justifyContent: 'center' }]}>
										<Text style={stylesInputBox.label}>Gynecologist</Text>
										<Picker
											selectedValue={props.values.gynecologist.id}
											onValueChange={value => 
											{
												const selectedGynecologist = gynecologists.find(
													gynecologist => gynecologist.id === value
												);
												props.setFieldValue( 'gynecologist', selectedGynecologist );
											}}
											dropdownIconColor={'#D31D1D'}
										>
											{gynecologists.map( gynecologist => (
												<Picker.Item
													key={gynecologist.id}
													label={gynecologist.first_name}
													value={gynecologist.id}
												/>
											) )}
										</Picker>
									</View>
									{error && (
										<Text style={styles.errors}>
											<Text style={{ fontWeight: '600' }}>Error: </Text>{' '}
											{error}
										</Text>
									)}
									<ImageButton
										text='Submit'
										onPress={props.handleSubmit}
										styleButton={stylesButton.button}
									/>
								</View>
							</View>
						)}
					</Formik>
				</ScrollView>
			)}
		</Modal>
	);
};

const stylesInputBox = StyleSheet.create( {
	container: {
		position: 'relative',
		borderWidth: 2,
		borderColor: '#D31D1D',
		borderRadius: 10,
		padding: 10,
		marginTop: 20,
		width: 320,
		height: 62
	},
	label: {
		position: 'absolute',
		backgroundColor: 'white',
		color: '#D31D1D',
		fontSize: 12,
		fontWeight: 'bold',
		top: -12,
		left: 10,
		paddingLeft: 5,
		paddingRight: 5,
	},
	input: {
		padding: 5,
		width: 270,
	},
	inlineIcon: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	}
} );
  

const stylesButton = StyleSheet.create( {
	button: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		width: 180,
		borderRadius: 20,
		elevation: 3,
		backgroundColor: '#D31D1D',
		height: 60,
		marginBottom: 20,
		marginTop: 20
	},
} );

const styles = StyleSheet.create( {
	containerMain: {
		flex: 1,
		alignItems: 'center',
	},
	titleBackground: {
		backgroundColor: '#D31D1D',
		padding: 15,
		paddingRight: 20,
		width: screen.width,
		marginBottom: 10,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	titleText: {
		color: 'white',
		fontSize: 20,
		fontWeight: '500'
	},
	containerInputs : {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	calendar: {
		borderRadius: 10, 
		borderColor: '#D31D1D', 
		borderWidth: 2,
		marginTop: 20,
		overflow: 'hidden',
		width: 320,
	},
	picker: {
		borderRadius: 10,
		borderColor: '#D31D1D',
		borderWidth: 2,
		fontSize: 18,
	},
	errors: {
		fontStyle: 'italic',
		color: '#D31D1D',
		marginTop: 20,
		marginLeft: 7,
		marginBottom: 7
	}
} );

export default AddMedicalExam;
