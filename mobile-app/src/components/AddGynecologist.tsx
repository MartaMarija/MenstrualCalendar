import { Formik } from 'formik';
import { useState } from 'react';
import {
	Pressable,
	TextInput,
	View,
	Text,
	StyleSheet,
	Modal,
	Dimensions,
	Image,
	ScrollView
} from 'react-native';
import { insertGynecologist } from '../api/gynecologist';
import { Gynecologist } from '../api/response/Gynecologist';
import ImageButton from './ImageButton';

interface Props {
    setAddGynecologist: (
        pressed: boolean | ( ( prevPressed: boolean ) => boolean )
    ) => void,
	showToast: ( message : string ) => void
}

const screen = Dimensions.get( 'window' );

const AddGynecologist: React.FC<Props> = ( { setAddGynecologist, showToast } ) => 
{
	const [error, setError] = useState( '' );

	async function submit( values: Gynecologist ) 
	{
		const response = await insertGynecologist( values ).catch( ( error )=>
		{
			switch( error.response.status )
			{
			case 400:
				setError( 'First name is required!' );
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
			showToast( response.message );
			setAddGynecologist( false );
		}
	}

	return (
		<Modal>
			<ScrollView>
				<Formik
					initialValues={{
						id: '',
						first_name: '',
						last_name: '',
						telephone: '',
						address: '',
					}}
					onSubmit={( values: Gynecologist ) => submit( values )}
				>
					{props => (
						<View style={styles.containerMain}>
							<View style={styles.titleBackground}>
								<Text style={styles.titleText}> Add a gynecologist </Text>
								<Pressable onPress={() => setAddGynecologist( false )}>
									<Image source={require( '../assets/ExitX.png' )} 
										style={{ width: 20, height: 20, }} />
								</Pressable>
							</View>
							<View style={styles.containerInputs}>
								<View style={stylesInputBox.container}>
									<Text style={stylesInputBox.label}>First name</Text>
									<TextInput 
										style={stylesInputBox.input}
										value={props.values.first_name}
										onChangeText={props.handleChange( 'first_name' )}
										onBlur={props.handleBlur( 'first_name' )}
										selectionColor='#D31D1D'
									/>
								</View>
								<View style={stylesInputBox.container}>
									<Text style={stylesInputBox.label}>Last name</Text>
									<TextInput 
										style={stylesInputBox.input}
										value={props.values.last_name}
										onChangeText={props.handleChange( 'last_name' )}
										onBlur={props.handleBlur( 'last_name' )}
										selectionColor='#D31D1D'
									/>
								</View>
								<View style={stylesInputBox.container}>
									<Text style={stylesInputBox.label}>Telephone</Text>
									<TextInput 
										style={stylesInputBox.input}
										value={props.values.telephone}
										onChangeText={props.handleChange( 'telephone' )}
										onBlur={props.handleBlur( 'telephone' )}
										selectionColor='#D31D1D'
									/>
								</View>
								<View style={stylesInputBox.container}>
									<Text style={stylesInputBox.label}>Address</Text>
									<TextInput 
										style={stylesInputBox.input}
										value={props.values.address}
										onChangeText={props.handleChange( 'address' )}
										onBlur={props.handleBlur( 'address' )}
										selectionColor='#D31D1D'
									/>
								</View>
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
					)}
				</Formik>
			</ScrollView>
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


export default AddGynecologist;
