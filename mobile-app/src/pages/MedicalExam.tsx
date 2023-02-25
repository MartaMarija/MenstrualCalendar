import { useState } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import AddGynecologist from '../components/AddGynecologist';
import AddMedicalExam from '../components/AddMedicalExam';
import ViewGynecologists from '../components/ViewGynecologists';
import ViewMedicalExam from '../components/ViewMedicalExam';

const MedicalExam = () => 
{
	const [viewMedicalExams, setViewMedicalExams] = useState( false );
	const [addGynecologist, setAddGynecologist] = useState( false );
	const [viewGynecologists, setViewGynecologists] = useState( false );
	const [addMedicalExam, setAddMedicalExam] = useState( false );
	return (
		<View style={styles.container}>
			{viewMedicalExams && <ViewMedicalExam setViewMedicalExams={setViewMedicalExams}/>}
			{addGynecologist && <AddGynecologist setAddGynecologist={setAddGynecologist}/>}
			{viewGynecologists && <ViewGynecologists setViewGynecologists={setViewGynecologists}/>}
			{addMedicalExam && <AddMedicalExam setAddMedicalExam={setAddMedicalExam}/>}
			<View>
				<Pressable style={styles.button} onPress={()=>setAddGynecologist( true )}>
					<Text style={styles.buttonText}>Add gynecologist</Text>
				</Pressable>
				<Pressable style={styles.button} onPress={()=>setAddMedicalExam( true )}>
					<Text style={styles.buttonText}>Add medical exam</Text>
				</Pressable>
				<Pressable style={styles.button} onPress={()=>setViewGynecologists( true )}>
					<Text style={styles.buttonText}>View gynecologists</Text>
				</Pressable>
				<Pressable style={styles.button} onPress={()=>setViewMedicalExams( true )}>
					<Text style={styles.buttonText}>View medical exams</Text>
				</Pressable>
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

export default MedicalExam;
