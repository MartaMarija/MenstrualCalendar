import { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import { LoginData } from '../api/request/LoginData'
import { loginUser } from '../api/users'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    async function checkLoginData() {
        let loginData: LoginData = { email: email, password: password }
        let jwt = await loginUser(loginData)
        console.log(jwt)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome!</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={email => setEmail(email)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={password => setPassword(password)}
            />
            <Pressable style={styles.button} onPress={checkLoginData}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcomeText: {
        color: 'red',
        fontSize: 30,
        fontWeight: '600',
        marginBottom: 20,
    },
    input: {
        borderColor: 'red',
        borderWidth: 2,
        borderRadius: 8,
        padding: 15,
        fontSize: 12,
        width: 300,
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        width: 300,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: 'red',
        height: 63,
    },
})

export default Login
