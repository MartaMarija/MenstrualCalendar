import { Formik } from 'formik';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LoginData } from '../api/request/LoginData';
import { useAuth } from '../auth/Auth';
import ImageButton from '../components/ImageButton';

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
							<Image
								source={require ( '../assets/Logo.png' )}
								style={{ width: 200, height: 50 }}
							/>	
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
									selectionColor="#D31D1D"
									autoCapitalize="none"
								/>
								<View style={[styles.containerInput, { marginTop: 20 }]}>
									<TextInput
										style={styles.inputStyle}
										placeholder='Password'
										onChangeText={props.handleChange( 'password' )}
										onBlur={props.handleBlur( 'password' )}
										value={props.values.password}
										selectionColor="#D31D1D"
										autoCapitalize="none"
										secureTextEntry={hidePassword}
									/>
									{hidePassword && (
										<TouchableOpacity onPress={ ()=>
										{
											setHidePassword( false );
										}}>
											<Image
												source={require ( '../assets/hideShowPassword/ShowPasswordRed.png' )}
												style={{ width: 20, height: 14 }}
											/>
										</TouchableOpacity>
									)}
									{!hidePassword && (
										<TouchableOpacity onPress={ ()=>
										{
											setHidePassword( true );
										}}>
											<Image
												source={require ( '../assets/hideShowPassword/HidePasswordRed.png' )}
												style={{ width: 20, height: 20 }}
											/>
										</TouchableOpacity>
									)}
								</View>
							</View>
							<ImageButton
								image={require( '../assets/LogInSign.png' )}
								text='Log in'
								onPress={props.handleSubmit}
							/>
						</View>
						<View style={styles.container3}>
							<TouchableOpacity >
								{/* onPress={() => navigation.navigate( 'forgotPassword' )}> */}
								<Text style={styles.textUnder}>Forgot password?</Text>
							</TouchableOpacity>
							<TouchableOpacity>
								{/* onPress={() => navigation.navigate( 'registration' )} */}
								<Text style={styles.textUnder}>Sign up</Text>
							</TouchableOpacity>
						</View>
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
		justifyContent: 'center',
		backgroundColor: '#D31D1D'
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
		maxHeight: 450,
		width: 330,
		borderRadius: 20,
		backgroundColor: 'white'
	},
	containerInput: {
		borderRadius: 20,
		backgroundColor: 'white',
		borderColor: '#D31D1D',
		borderWidth: 2,
		width: 272,
		height: 60,
		paddingHorizontal: 24,
		paddingVertical: 12,
		flexDirection: 'row',
		alignItems: 'center',
	},
	input: {
		borderColor: '#D31D1D',
		borderWidth: 2,
		borderRadius: 8,
		padding: 15,
		fontSize: 12,
		width: 300
	},
	inputStyle: {
		flex: 1,
	},
	errors: {
		fontStyle: 'italic',
		color: '#D31D1D',
		marginTop: 7,
		marginLeft: 7,
		width: 230,
	},
	container3: {
		width: 300,
		maxHeight: 26,
		marginTop: 10,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	textUnder: {
		color: 'white',
		fontWeight: '500',
		fontSize: 13
	},
} );

export default Login;
