import { useEffect, useState } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Modal,
	FlatList,
	Dimensions,
	TouchableWithoutFeedback,
	Image,
	Pressable
} from 'react-native';
import { getGynecologists, delteGynecologist } from '../api/gynecologist';
import { Gynecologist } from '../api/response/Gynecologist';

interface Props {
    setViewGynecologists: (
        pressed: boolean | ( ( prevPressed: boolean ) => boolean )
    ) => void
}

const screen = Dimensions.get( 'window' );

const ViewGynecologists: React.FC<Props> = ( { setViewGynecologists } ) => 
{
	const [gynecologists, setGynecologists] = useState<Gynecologist[]>();

	useEffect( () => 
	{
		( async () => 
		{
			await fetchGyns();
		} )();
	}, [] );

	async function fetchGyns() 
	{
		const gynecologists = await getGynecologists();
		setGynecologists( gynecologists );
	}

	async function deleteGyn( gynId: string ) 
	{
		await delteGynecologist( gynId );
		await fetchGyns();
	}

	return (
		<Modal>
			<View style={styles.mainContainer}>
				<View>
					<View style={styles.titleBackground}>
						<Text style={styles.titleText}>Gynecologists</Text>
						<Pressable onPress={() => setViewGynecologists( false )}>
							<Image source={require( '../assets/ExitX.png' )} 
								style={{ width: 20, height: 20, }} />
						</Pressable>
					</View>
				</View>
				{( gynecologists && gynecologists.length == 0 ) ?
					( <Text style={{ marginTop: 20 }}>There are no gynecologists to show!</Text> )
					:
					( <FlatList
						style={styles.flatList}
						data={gynecologists}
						renderItem={( { item } ) => (
							<TouchableWithoutFeedback>
								<View style={styles.buttonAndInfo}>
									<View style={{ flex: 1 , alignContent: 'center', justifyContent: 'center' }}>
										<View style={styles.labelTextContainer2}>
											<Text style={styles.label}>
                                        First name:{' '}
											</Text>
											<Text style={styles.text}>
												{item.first_name}
											</Text>
										</View>
										<View style={styles.labelTextContainer2}>
											<Text style={styles.label}>
                                        Last name:{' '}
											</Text>
											<Text style={styles.text}>
												{item.last_name}
											</Text>
										</View>
										<View style={styles.labelTextContainer2}>
											<Text style={styles.label}>Address: </Text>
											<Text style={styles.text}>
												{item.address}
											</Text>
										</View>
										<View style={styles.labelTextContainer2}>
											<Text style={styles.label}>
                                        Telephone:{' '}
											</Text>
											<Text style={styles.text}>
												{item.telephone}
											</Text>
										</View>
									</View>
									<View style={stylesButton.container}>
										<View style={stylesButton.iconContainer}>
											<TouchableWithoutFeedback
												onPress={() => deleteGyn( item.id )}
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
		alignItems: 'flex-end',
		// marginTop: 5,
		// marginRight: 5
	},
	iconContainer: {
		borderWidth: 2, 
		borderRadius: 5, 
		borderColor:'#D31D1D',
		padding: 6
	}
} );

const styles = StyleSheet.create( {
	flatList: {
		
	},
	mainContainer: {
		flex: 1,
		alignItems: 'center',
	},
	buttonAndInfo: {
		padding: 15,
		borderRadius: 10,
		borderColor: '#D31D1D',
		borderWidth: 2,
		// marginBottom: 10,
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

export default ViewGynecologists;
