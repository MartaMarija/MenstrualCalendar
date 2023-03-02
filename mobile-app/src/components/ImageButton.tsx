import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface Props {
    text: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onPress: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image?: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	styleButton?: any; 
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	styleButtonContent?: any; 
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	styleButtonText?: any; 
}

const ImageButton: React.FC<Props> = ( { text, onPress, image, styleButton, styleButtonContent, styleButtonText } ) => 
{
	return (
		<TouchableOpacity style={styleButton || stylesButton.button} onPress={onPress}>
			<View style={styleButtonContent || stylesButton.buttonContent}>
				{image &&
                    <Image source={image} style={{ width: 20, height: 20, marginRight: 15 }} />
				}
				<Text style={styleButtonText || stylesButton.buttonText}>{text}</Text>
			</View>
		</TouchableOpacity>
	);
};


const stylesButton = StyleSheet.create( {
	buttonText: {
		color: 'white',
		fontWeight: '600',
		fontSize: 16,
	},
	button: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		width: 272,
		borderRadius: 20,
		elevation: 3,
		backgroundColor: '#D31D1D',
		maxHeight: 63,
	},
	buttonContent: {
		flexDirection: 'row',
		alignItems: 'center'
	}
} );


export default ImageButton;
