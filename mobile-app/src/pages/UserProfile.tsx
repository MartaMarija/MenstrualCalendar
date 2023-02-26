import { useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { useAuth } from '../auth/Auth';
import ImageButton from '../components/ImageButton';

const UserProfile = () => 
{
	const [showEditProfile, setShowEditProfile] = useState( false );
	const auth = useAuth();
	return (
		<View style={styles.container}>
			<View  style={styles.containerButtonsLogo}>
				{showEditProfile &&
				<View>
					<Text onPress={()=> setShowEditProfile( false )}>Hi</Text>
				</View>
				}
				<Image
					source={require ( '../assets/Logo.png' )}
					style={{ width: 200, height: 100 }}
				/>
				<ImageButton
					image={require( '../assets/menuIcons/UserWhite.png' )}
					text='Edit profile'
					onPress={setShowEditProfile}
				/>
				<ImageButton
					image={require( '../assets/LogOutSign.png' )}
					text='Log out'
					onPress={auth.signOut}
				/>
			</View>
		</View>
	);
};


const styles = StyleSheet.create( {
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	containerButtonsLogo: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-evenly',
		maxHeight: 350
	},
	welcomeText: {
		color: '#D31D1D',
		fontSize: 30,
		fontWeight: '600',
		marginBottom: 20,
	},
	input: {
		borderColor: '#D31D1D',
		borderWidth: 2,
		borderRadius: 8,
		padding: 15,
		fontSize: 12,
		width: 300,
		marginBottom: 20,
	},
} );
export default UserProfile;
