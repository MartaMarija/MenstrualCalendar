import { AuthContextProvider } from './src/auth/Auth';
import Navigator from './src/pages/Navigator';
import { StatusBar, StyleSheet, SafeAreaView } from 'react-native';

export default function App() 
{
	return (
		<AuthContextProvider>
			<StatusBar barStyle="dark-content" backgroundColor="#D31D1D" />
			<SafeAreaView style={styles.container}>
				<Navigator/>
			</SafeAreaView>
		</AuthContextProvider>
	);
}

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		paddingTop: 0, 
	},
} );


