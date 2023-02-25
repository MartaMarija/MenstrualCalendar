import { Text, StyleSheet, Pressable, View } from 'react-native';
import { useAuth } from '../contexts/Auth';

const UserProfile = () => 
{
	const auth = useAuth();
	return (
		<View style={styles.container} >
			<Pressable style={styles.button} onPress={auth.signOut}>
				<Text style={styles.buttonText}>Log out</Text>
			</Pressable>
		</View>
	);
};
const styles = StyleSheet.create( {
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	welcomeText: {
		color: 'red',
		fontSize: 30,
		fontWeight: '600',
		marginBottom: 20,
	},
	input: {
		borderColor: 'red',
		borderWidth: 2,
		borderRadius: 8,
		padding: 15,
		fontSize: 12,
		width: 300,
		marginBottom: 20,
	},
	buttonText: {
		color: 'white',
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
	},
} );
export default UserProfile;
