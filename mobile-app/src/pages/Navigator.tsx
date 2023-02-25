import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from './Calendar';
import MedicalExam from './MedicalExam';
import UserProfile from './UserProfile';
import Login from './Login';
import { useAuth } from '../auth/Auth';
import { Loading } from '../components/Loading';

const Tab = createBottomTabNavigator();

const Navigator = () => 
{
	const { authData, loading } = useAuth();
	if ( loading ) 
	{
		return <Loading />;
	}
	return (
		<NavigationContainer>
			{authData?.accessToken ? (
				<Tab.Navigator
					screenOptions={{
						tabBarStyle: { height: 60, backgroundColor: '#D31D1D' },
						headerStyle: { height: 80, backgroundColor: '#D31D1D' },
						headerTintColor: 'white',
						tabBarInactiveTintColor: 'white',
						tabBarActiveTintColor: '#D31D1D',
						tabBarActiveBackgroundColor: 'white',
					}}
				>
					<Tab.Screen name="User Profile" component={UserProfile} />
					<Tab.Screen name="Calendar" component={CalendarScreen} />
					<Tab.Screen name="Medical Exam" component={MedicalExam} />
				</Tab.Navigator>
			) : (
				<Login />
			)}
		</NavigationContainer>
	);
};

export default Navigator;
