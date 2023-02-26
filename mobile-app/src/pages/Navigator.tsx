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
					initialRouteName='Calendar'
				>
					<Tab.Screen 
						name="UserProfile" 
						component={UserProfile}
						options={{
							tabBarIcon: ( { focused } ) => 
							{
								return focused ? (
									<Image
										source={require ( '../assets/menuIcons/UserFocused.png' )}
										style={{ width: 60, height: 60, }}
									/>
								) : (
									<Image
										source={require ( '../assets/menuIcons/UserWhite.png' )}
										style={{ width: 30, height: 30, }}
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
										source={require ( '../assets/menuIcons/CalendarFocused.png' )}
										style={{ width: 60, height: 60, }}
									/>
								) : (
									<Image
										source={require ( '../assets/menuIcons/CalendarWhite.png' )}
										style={{ width: 30, height: 32, }}
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
										source={require ( '../assets/menuIcons/HealthFocused.png' )}
										style={{ width: 60, height: 60, }}
									/>
								) : (
									<Image
										source={require ( '../assets/menuIcons/HealthWhite.png' )}
										style={{ width: 34, height: 31, }}
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
