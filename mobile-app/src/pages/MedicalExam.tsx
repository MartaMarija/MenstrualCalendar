import { useState } from 'react';
import { View, Image, StyleSheet, ToastAndroid } from 'react-native';
import AddGynecologist from '../components/AddGynecologist';
import AddMedicalExam from '../components/AddMedicalExam';
import ImageButton from '../components/ImageButton';
import ViewGynecologists from '../components/ViewGynecologists';
import ViewMedicalExam from '../components/ViewMedicalExam';

const MedicalExam = () => 
{
	const [viewMedicalExams, setViewMedicalExams] = useState( false );
	const [addGynecologist, setAddGynecologist] = useState( false );
	const [viewGynecologists, setViewGynecologists] = useState( false );
	const [addMedicalExam, setAddMedicalExam] = useState( false );
	
	const showToast = ( message: string ) => 
	{
		ToastAndroid.show(
			message,
			ToastAndroid.SHORT
		);
	};
	
	return (
		<View style={styles.container}>
			{viewMedicalExams && <ViewMedicalExam setViewMedicalExams={setViewMedicalExams}/>}
			{addGynecologist && <AddGynecologist setAddGynecologist={setAddGynecologist} showToast={showToast}/>}
			{viewGynecologists && <ViewGynecologists setViewGynecologists={setViewGynecologists}/>}
			{addMedicalExam && <AddMedicalExam setAddMedicalExam={setAddMedicalExam} showToast={showToast}/>}
			<View style={styles.containerButtonsLogo}>
				<Image
					source={require ( '../assets/Logo.png' )}
					style={{ width: 200, height: 50 }}
				/>	
				<View style={styles.containerButtons}>
					<ImageButton
						text='Add a gynecologist'
						onPress={setAddGynecologist}
					/>
					<ImageButton
						text='View gynecologists'
						onPress={setViewGynecologists}
					/>
					<View style={line.container}>
						<View style={line.line} />
					</View>

					<ImageButton
						text='Add a medical exam'
						onPress={setAddMedicalExam}
					/>
					<ImageButton
						text='View medical exams'
						onPress={setViewMedicalExams}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		alignItems:'center',
		justifyContent:'center'
	},
	containerButtons: {
		flex: 1,
		alignItems:'center',
		justifyContent:'space-evenly',
		maxHeight: 380
	},
	containerButtonsLogo: {
		flex: 1,
		alignItems:'center',
		justifyContent: 'space-evenly',
		maxHeight: 525
	}
} );

const line = StyleSheet.create( {
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 10,
		width: 260,
	},
	line: {
		flex: 1,
		height: 1.5,
		backgroundColor: '#D31D1D',
	},
} );

export default MedicalExam;
