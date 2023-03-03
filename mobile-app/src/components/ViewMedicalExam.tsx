import { useEffect, useState } from 'react';
import { Pressable, Text, View, StyleSheet, Modal, FlatList, 
	Dimensions, TouchableWithoutFeedback, Image, ToastAndroid
} from 'react-native';
import { getMedicalExams, delteMedicalExam } from '../api/medicalExam';
import { MedicalExam } from '../api/response/MedicalExam';

interface Props {
    setViewMedicalExams: (
        pressed: boolean | ( ( prevPressed: boolean ) => boolean )
    ) => void
}

const screen = Dimensions.get( 'window' );

const ViewMedicalExam: React.FC<Props> = ( { setViewMedicalExams } ) => 
{
	const [medicalExams, setMedicalExams] = useState<MedicalExam[]>();

	useEffect( () => 
	{
		( async () => 
		{
			fetchExams();
		} )();
	}, [] );

	async function fetchExams() 
	{
		const medicalExams = await getMedicalExams();
		setMedicalExams( medicalExams );
	}

	const showToast = ( message: string ) => 
	{
		ToastAndroid.show(
			message,
			ToastAndroid.SHORT
		);
	};

	async function deleteExam( examId: string ) 
	{
		const response = await delteMedicalExam( examId ).catch( ( error ) =>
		{
			switch( error.response.status )
			{
			case 404:
				showToast( 'Medical exam not found!' );
				break;
			case 500:
				showToast( 'Internal server error' );
				break;
			default:
				showToast( 'Unknown error occured!' );
				break;
			}
		}
		);
		if ( response )
		{
			await fetchExams();
			showToast( response.message );
		}
	}

	return (
		<Modal>
			<View style={styles.mainContainer}>
				<View>
					<View style={styles.titleBackground}>
						<Text style={styles.titleText}>Medical exams</Text>
						<Pressable onPress={() => setViewMedicalExams( false )}>
							<Image source={require( '../assets/ExitX.png' )} 
								style={{ width: 20, height: 20, }} />
						</Pressable>
					</View>
				</View>
				{( medicalExams && medicalExams.length == 0 ) ?
					( <Text style={{ marginTop: 20 }}>There are no medical exams to show!</Text> )
					:
					( <FlatList
						data={medicalExams}
						renderItem={( { item } ) => (
							<TouchableWithoutFeedback>
								<View style={styles.buttonAndInfo}>
									<View style={{ flex: 1 , alignContent: 'center', justifyContent: 'center' }}>
										<View style={styles.labelTextContainer2}>
											<Text style={styles.label}>Date:</Text>
											<Text style={styles.text}>{item.date.toString()}</Text>
										</View>
										<View style={styles.labelTextContainer2}>
											<Text style={styles.label}>Description: </Text>
											<Text style={styles.text}>{item.description}</Text>
										</View>
										<View style={styles.labelTextContainer2}>
											<Text style={styles.label}>Gynecologist: </Text>
											{item.gynecologist && (
												<Text style={styles.text}> 
													{item.gynecologist.first_name}{' '}
													{item.gynecologist.last_name} 
												</Text>
											)}
										</View>
									</View>
									<View style={stylesButton.container}>
										<View style={stylesButton.iconContainer}>
											<TouchableWithoutFeedback
												onPress={() => deleteExam( item.id )}
											>
												<Image source={require( '../assets/TrashCan.png' )}
													style={{ width: 25, height: 28,  }}
												/>
											</TouchableWithoutFeedback>
										</View>
									</View>
								</View>
							</TouchableWithoutFeedback>
						)}
						keyExtractor={item => item.id}
					/> )}
			</View>
		</Modal>
	);
};


const stylesButton = StyleSheet.create( {
	container: {
		flex: 1,
		alignItems: 'flex-end'
	},
	iconContainer: {
		borderWidth: 2, 
		borderRadius: 5, 
		borderColor:'#D31D1D',
		padding: 6
	}
} );

const styles = StyleSheet.create( {
	mainContainer: {
		flex: 1,
		alignItems: 'center',
		marginBottom: 20
	},
	buttonAndInfo: {
		padding: 15,
		borderRadius: 10,
		borderColor: '#D31D1D',
		borderWidth: 2,
		marginTop: 15,
		flex: 1 , 
		flexDirection: 'row',
		width: 320,
		marginLeft: ( screen.width-320 )/2,
		marginRight: ( screen.width-320 )/2,
	},
	labelTextContainer2: {
		width: 320
	},
	label: {
		fontSize: 16,
		fontWeight: '600',
	},
	text: {
		fontSize: 14,
		width: 290,
		marginBottom: 5
	},
	titleBackground: {
		backgroundColor: '#D31D1D',
		padding: 15,
		paddingRight: 20,
		width: screen.width,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		maxHeight: 63
	},
	titleText: {
		color: 'white',
		fontSize: 20,
		fontWeight: '500',
	},
} );


export default ViewMedicalExam;
