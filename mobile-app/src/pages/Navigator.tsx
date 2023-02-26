import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from './Calendar';
import MedicalExam from './MedicalExam';
import UserProfile from './UserProfile';
import Login from './Login';
import { useAuth } from '../auth/Auth';
import { Loading } from '../components/Loading';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

const Navigator = () => 
{
	const { authData, loading } = useAuth();
	if ( loading ) 
	{
		return <Loading />;
	}
	return (
		<NavigationContainer 
			theme={{ 
				colors: { 
					primary: 'white', 
					background: 'white',
					card: 'white',
					text: 'black',
					border: 'white',
					notification: 'white' }, 
				dark: false 
			}}>
			{authData?.accessToken ? (
				<Tab.Navigator
					screenOptions={{
						tabBarStyle: { height: 80, backgroundColor: '#D31D1D' },
						headerStyle: { height: 80, backgroundColor: '#D31D1D' },
						headerTintColor: 'white',
						headerShown: false,
						tabBarLabelStyle: { display: 'none' }, 
					}}
				>
					<Tab.Screen 
						name="User Profile" 
						component={UserProfile}
						options={{
							tabBarIcon: ( { focused } ) => 
							{
								return focused ? (
									<Image
										source={require ( '../assets/UserFocused.png' )}
									/>
								) : (
									<Image
										source={require ( '../assets/UserWhite.png' )}
									/>
								);
							}, 
						}}
					/>
					<Tab.Screen 
						name="Calendar" 
						component={CalendarScreen}
						options={{
							tabBarIcon: ( { focused } ) => 
							{
								return focused ? (
									<Image
										source={require ( '../assets/CalendarFocused.png' )}
									/>
								) : (
									<Image
										source={require ( '../assets/CalendarWhite.png' )}
									/>
								);
							}, 
						}}
					/>
					<Tab.Screen 
						name="Medical Exam" 
						component={MedicalExam} 
						options={{
							tabBarIcon: ( { focused } ) => 
							{
								return focused ? (
									<Image
										source={require ( '../assets/HealthFocused.png' )}
									/>
								) : (
									<Image
										source={require ( '../assets/HealthWhite.png' )}
									/>
								);
							}, 
						}}
					/>
				</Tab.Navigator>
			) : (
				<Login />
			)}
		</NavigationContainer>
	);
};

export default Navigator;
