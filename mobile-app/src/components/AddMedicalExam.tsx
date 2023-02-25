import { Formik } from 'formik';
import {
	Pressable,
	TextInput,
	View,
	Text,
	StyleSheet,
	Modal,
	Dimensions,
} from 'react-native';
import { insertMedicalExam } from '../api/medicalExam';
import { getGynecologists } from '../api/gynecologist';
import { MedicalExam } from '../api/response/MedicalExam';
import { Gynecologist } from '../api/response/Gynecologist';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';

interface Props {
    setAddMedicalExam: (
        pressed: boolean | ( ( prevPressed: boolean ) => boolean )
    ) => void
}

const screen = Dimensions.get( 'window' );

const AddMedicalExam: React.FC<Props> = ( { setAddMedicalExam } ) => 
{
	const [gynecologists, setGynecologists] = useState<Gynecologist[]>();

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
		await insertMedicalExam( values );
		setAddMedicalExam( false );
	}

	return (
		<Modal>
			{gynecologists && (
				<Formik
					initialValues={{
						id: '',
						date: new Date(),
						description: '',
						gynecologist: {
							id: '',
							first_name: '',
							last_name: '',
							address: '',
							telephone: '',
						},
					}}
					onSubmit={( values: MedicalExam ) => submit( values )}
				>
					{props => (
						<View style={styles.container}>
							<View style={styles.titleBackground}>
								<Text style={styles.title}>
                                    Add medical exam
								</Text>
							</View>
							<View>
								<Text style={styles.text}>Date:</Text>
								<TextInput
									onChangeText={props.handleChange( 'date' )}
									onBlur={props.handleBlur( 'date' )}
									value={props.values.date.toDateString()}
									style={styles.labelTextContainer}
									selectionColor="red"
								/>
								<Text style={styles.text}>Description:</Text>
								<TextInput
									onChangeText={props.handleChange(
										'description'
									)}
									onBlur={props.handleBlur( 'description' )}
									value={props.values.description}
									style={styles.labelTextContainer}
									selectionColor="red"
								/>
								<Text style={styles.text}>Gyn:</Text>
								<View style={styles.picker}>
									<Picker
										selectedValue={
											props.values.gynecologist.id
										}
										onValueChange={value =>
											props.setFieldValue(
												'gynecologist.id',
												value
											)
										}
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
							</View>
							<Pressable
								style={styles.button}
								onPress={() => props.handleSubmit()}
							>
								<Text style={styles.buttonText}>Submit</Text>
							</Pressable>
							<Pressable
								style={styles.button}
								onPress={() => setAddMedicalExam( false )}
							>
								<Text style={styles.buttonText}>Cancel</Text>
							</Pressable>
						</View>
					)}
				</Formik>
			)}
		</Modal>
	);
};

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		alignItems: 'center',
	},
	labelTextContainer: {
		padding: 10,
		borderRadius: 10,
		borderColor: '#D31D1D',
		borderWidth: 3,
		marginBottom: 10,
		marginTop: 5,
		width: screen.width - 30,
		fontSize: 18,
	},
	label: {
		fontSize: 18,
		fontWeight: '600',
	},
	text: {
		fontSize: 18,
		fontWeight: '500',
	},
	titleBackground: {
		backgroundColor: '#D31D1D',
		padding: 15,
		width: screen.width,
		marginBottom: 10,
	},
	picker: {
		borderRadius: 10,
		borderColor: '#D31D1D',
		borderWidth: 3,
		marginBottom: 10,
		marginTop: 5,
		width: screen.width - 30,
		fontSize: 18,
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
		backgroundColor: '#D31D1D',
		height: 63,
		margin: 10,
	},
} );

export default AddMedicalExam;
