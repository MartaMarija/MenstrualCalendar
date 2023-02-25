import { useEffect, useState } from 'react';
import {
	Pressable,
	Text,
	View,
	StyleSheet,
	Modal,
	FlatList,
	Dimensions,
	TouchableWithoutFeedback,
} from 'react-native';
import { getMedicalExams, delteMedicalExam } from '../api/medicalExam';
import { MedicalExam } from '../api/response/MedicalExam';
import { useAuth } from '../contexts/Auth';

interface Props {
    setViewMedicalExams: (
        pressed: boolean | ( ( prevPressed: boolean ) => boolean )
    ) => void
}

const screen = Dimensions.get( 'window' );

const ViewMedicalExam: React.FC<Props> = ( { setViewMedicalExams } ) => 
{
	const auth = useAuth();
	const [medicalExams, setMedicalExams] = useState<MedicalExam[]>();

	useEffect( () => 
	{
		( async () => 
		{
			fetchExams();
		} )();
	}, [deleteExam] );

	async function fetchExams() 
	{
		const medicalExams = await getMedicalExams( auth.authData?.token );
		setMedicalExams( medicalExams );
	}

	async function deleteExam( examId: string ) 
	{
		await delteMedicalExam(
			auth.authData?.token,
			examId
		);
	}

	return (
		<Modal>
			<View style={styles.container}>
				<View style={styles.titleBackground}>
					<Text style={styles.title}>Medical Exam</Text>
				</View>
				<FlatList
					style={styles.flatList}
					data={medicalExams}
					renderItem={( { item } ) => (
						<TouchableWithoutFeedback>
							<View style={styles.labelTextContainer}>
								<View style={styles.labelTextContainer2}>
									<Text style={styles.label}>Date: </Text>
									<Text style={styles.text}>
										{item.date.toString()}
									</Text>
								</View>
								<View style={styles.labelTextContainer2}>
									<Text style={styles.label}>
                                        Description:{' '}
									</Text>
									<Text style={styles.text}>
										{item.description}
									</Text>
								</View>
								<View style={styles.labelTextContainer2}>
									<Text style={styles.label}>GYN name: </Text>
									{item.gynecologist && (
										<Text style={styles.text}>
											{item.gynecologist.first_name}{' '}
											{item.gynecologist.last_name}
										</Text>
									)}
								</View>
								<TouchableWithoutFeedback
									onPress={() => deleteExam( item.id )}
								>
									<Pressable
										style={styles.buttonSmall}
										onPress={() => deleteExam( item.id )}
									>
										<Text style={styles.buttonText}>
                                            Delete
										</Text>
									</Pressable>
								</TouchableWithoutFeedback>
							</View>
						</TouchableWithoutFeedback>
					)}
					keyExtractor={item => item.id}
				/>
				<Pressable
					style={styles.button}
					onPress={() => setViewMedicalExams( false )}
				>
					<Text style={styles.buttonText}>Cancel</Text>
				</Pressable>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create( {
	flatList:{
		width: screen.width - 30
	},
	container: {
		flex: 1,
		alignItems: 'center',
	},
	labelTextContainer: {
		padding: 10,
		borderRadius: 10,
		borderColor: 'red',
		borderWidth: 3,
		marginBottom: 10,
		marginTop: 5,
	},
	labelTextContainer2: {
		margin: 5,
	},
	label: {
		fontSize: 18,
		fontWeight: '600',
	},
	text: {
		fontSize: 18,
	},
	titleBackground: {
		backgroundColor: 'red',
		padding: 15,
		width: screen.width,
		marginBottom: 10,
	},
	title: {
		color: 'white',
		fontSize: 20,
		fontWeight: '600',
	},
	buttonText: {
		color: 'white',
		fontSize: 20,
		fontWeight: '500',
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 32,
		width: 300,
		borderRadius: 8,
		elevation: 3,
		backgroundColor: 'red',
		height: 63,
		margin: 10,
	},
	buttonSmall: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 32,
		width: 150,
		borderRadius: 8,
		elevation: 5,
		backgroundColor: 'red',
		height: 53,
		margin: 10,
		borderStartColor: 'blue',
		zIndex: 5,
	},
} );

export default ViewMedicalExam;
