import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CalendarScreen from './src/pages/Calendar'
import MedicalExam from './src/pages/MedicalExam'
import UserProfile from './src/pages/UserProfile'

const Tab = createBottomTabNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: { height: 60, backgroundColor: 'red' },
                    headerStyle: { height: 80, backgroundColor: 'red' },
                    headerTintColor: 'white',
                    tabBarInactiveTintColor: 'white',
                    tabBarActiveTintColor: 'red',
                    tabBarActiveBackgroundColor: 'white'
                }}
            >
                <Tab.Screen name="User Profile" component={UserProfile} />
                <Tab.Screen name="Calendar" component={CalendarScreen} />
                <Tab.Screen name="Medical Exam" component={MedicalExam} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
