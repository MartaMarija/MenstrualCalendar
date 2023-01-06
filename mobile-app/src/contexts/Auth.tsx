import React, { createContext, useState, useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoginData } from '../api/request/LoginData'
import { loginUser } from '../api/users'

interface Props {
    children: React.ReactNode
}

type AuthData = {
    token: string
}

type AuthContextData = {
    authData?: AuthData
    loading: boolean
    signIn(loginData: LoginData): Promise<void>
    signOut(): void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
    const [authData, setAuthData] = useState<AuthData>()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadStorageData()
    }, [])

    async function loadStorageData(): Promise<void> {
        try {
            const authDataSerialized = await AsyncStorage.getItem('@AuthData')
            if (authDataSerialized) {
                const token: AuthData = JSON.parse(authDataSerialized)
                setAuthData(token)
            }
        } catch (error) {
        } finally {
            setLoading(false)
        }
    }

    const signIn = async (loginData: LoginData) => {
        let jwt = await loginUser(loginData);
        let token : AuthData = { token: jwt.token };
        setAuthData(token);
        AsyncStorage.setItem('@AuthData', JSON.stringify(token))
    }

    const signOut = async () => {
        setAuthData({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI3NzAwMzA2LTA2YWEtNGJkMS1hM2Y0LTY3NTcwMzg0YjVlMSIsImlhdCI6MTY3Mjg0Mzk2OX0.petZj_kEsD294Am1bdeSyuBMCLS7ZCvm1_YHHmVGLHo'});
        //setAuthData(undefined)
        //await AsyncStorage.removeItem('@AuthData')
    }

    return (
        <AuthContext.Provider value={{ authData, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
