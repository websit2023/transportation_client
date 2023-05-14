import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { clearRefreshToken, getRefreshToken, setRefreshToken } from "../utils/cookie";
import { getProfile, refreshToken } from "../services/auth.service";
import { UserInterface } from "../pages/AccountPage";

interface SignInResponse {
    access_token: string
    refresh_token: string
}

interface Auth {
    accessToken: string | null
    user: UserInterface | null
    addTokens: (tokens: SignInResponse) => void
    removeTokens: () => void
}

const AuthContext = createContext({} as Auth)

export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({ children }: { children: any }) {
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [user, setUser] = useState<UserInterface | null>(null)

    const addTokens = useCallback((tokens: SignInResponse) => {
        setAccessToken(tokens.access_token)
        setRefreshToken(tokens.refresh_token)
    }, [])

    const removeTokens = useCallback(() => {
        setAccessToken(null)
        setUser(null)
        clearRefreshToken()
    }, [])

    const getUserProfile = async () => {
        const userData = await getProfile()        
        setUser(userData)
    }

    useEffect(() => {
        if (accessToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
            getUserProfile()
        }
    }, [accessToken])

    useEffect(() => {
        const rfToken = getRefreshToken()
        if (!rfToken) {
            setLoading(false)
            return;
        }

        // gain access_token
        (async () => {
            const token = await refreshToken(rfToken)
            if (!token) {
                setAccessToken(null)
                setLoading(false)
                return;
            }
            setAccessToken(token.access_token)
            setLoading(false)
        })()

        // refresh token every 10 minute
        const timer = setInterval(async () => {
            const token = await refreshToken(rfToken)
            if (!token) {
                clearInterval(timer)
                setAccessToken(null)
                return;
            }
            setAccessToken(token.access_token)
        }, 10 * 60 * 1000);

        return () => clearInterval(timer);
    }, [])

    const memoedValue = useMemo(() => ({
        accessToken,
        addTokens,
        removeTokens,
        user
    }), [accessToken, addTokens, refreshToken, user])

    if (loading) return <></>
    
    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    )
}