import { Formik } from 'formik';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LoginData } from '../api/request/LoginData';
import { useAuth } from '../auth/Auth';

const Login = () => 
{
	const [hidePassword, setHidePassword] = useState( true );
	const [error, setError] = useState( '' );
	const auth = useAuth();

	return(
		<View style={styles.mainContainer}>
			<Formik
				initialValues={{ email: '', password: '' }}
				onSubmit={async ( values: LoginData ) => 
				{
					await auth.signIn( values ).catch( ( error )=>
					{
						switch( error.response.status )
						{
						case 401:
							setError( 'Invalid data!' );
							break;
						case 500:
							setError( 'Internal server error!' );
							break;
						}
					} );
				}}
			>
				{( props ) => (
					<View style={styles.secondContainer}>
						<View style={styles.container}>
							<Text style={styles.welcomeText}>LOGIN</Text>
							{error && (
								<Text style={styles.errors}>
									<Text style={{ fontWeight: '600' }}>Error: </Text>{' '}
									{error}
								</Text>
							)}
							<View>
								<TextInput
									style={styles.containerInput}
									placeholder='Email'
									onChangeText={props.handleChange( 'email' )}
									onBlur={props.handleBlur( 'email' )}
									value={props.values.email}
									selectionColor="black"
									autoCapitalize="none"
								/>
								<View style={[styles.containerInput, { marginTop: 20 }]}>
									<TextInput
										style={styles.inputStyle}
										placeholder='Password'
										onChangeText={props.handleChange( 'password' )}
										onBlur={props.handleBlur( 'password' )}
										value={props.values.password}
										selectionColor="black"
										autoCapitalize="none"
										secureTextEntry={hidePassword}
									/>
									{hidePassword && (
										<TouchableOpacity onPress={ ()=>
										{
											setHidePassword( false );
										}}>
											<Image
												source={require ( '../assets/SeePassword.png' )}
											/>
										</TouchableOpacity>
									)}
									{!hidePassword && (
										<TouchableOpacity onPress={ ()=>
										{
											setHidePassword( true );
										}}>
											<Image
												source={require ( '../assets/HidePassword.png' )}
											/>
										</TouchableOpacity>
									)}
								</View>
							</View>
						</View>
						<TouchableOpacity style={styles.button} onPress={() => 
						{
							props.handleSubmit();
						}}>
							<Text style={styles.buttonText}>Log in</Text>
						</TouchableOpacity>
					</View>
				)}
			</Formik>
		</View>
	);
};

const styles = StyleSheet.create( {
	mainContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	secondContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-evenly',
		maxHeight: 330,
		width: 330,
		borderRadius: 20,
		backgroundColor: '#D31D1D'
	},
	containerInput: {
		borderRadius: 40,
		backgroundColor: 'white',
		width: 272,
		height: 60,
		paddingHorizontal: 24,
		paddingVertical: 12,
		flexDirection: 'row',
		alignItems: 'center'
	},
	welcomeText: {
		color: 'white',
		fontSize: 26,
		fontWeight: '600'
	},
	input: {
		borderColor: 'white',
		borderWidth: 2,
		borderRadius: 8,
		padding: 15,
		fontSize: 12,
		width: 300
	},
	buttonText: {
		color: 'white',
		fontWeight: '600',
		fontSize: 16,
	},
	button: {
		marginTop: 20,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		width: 330,
		borderRadius: 20,
		elevation: 3,
		backgroundColor: '#D31D1D',
		height: 63,
	},
	inputStyle: {
		flex: 1,
	},
	errors: {
		fontStyle: 'italic',
		color: 'white',
		marginTop: 7,
		marginLeft: 7,
		width: 230,
	},
} );

export default Login;
