import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CalendarScreen from './Calendar'
import MedicalExam from './MedicalExam'
import UserProfile from './UserProfile'
import Login from './Login'
import { useAuth } from '../contexts/Auth'
import { Loading } from '../components/Loading'

const Tab = createBottomTabNavigator()

const Navigator = () => {
    const { authData, loading } = useAuth()
    if (loading) {
        return <Loading />
    }
    return (
        <NavigationContainer>
            {authData?.token ? (
                <Tab.Navigator
                    screenOptions={{
                        tabBarStyle: { height: 60, backgroundColor: 'red' },
                        headerStyle: { height: 80, backgroundColor: 'red' },
                        headerTintColor: 'white',
                        tabBarInactiveTintColor: 'white',
                        tabBarActiveTintColor: 'red',
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Navigator
