import axios from "axios";
import { BASE_URL } from "../constants/server";

async function signUp(account: any) {
    try {
        const { data } = await axios.post(`${BASE_URL}/auth/signUp`, account)
        if(!data) throw new Error

        return data
    } catch (error) {
        return null
    }
}

async function signIn(email:string, password: string) {
    try {
        const { data } = await axios.post(`${BASE_URL}/auth/signIn`, { email, password })
        if(!data) throw new Error

        return data
    } catch (error) {
        return null
    }
}

async function refreshToken(token: string) {
    try {
        const { data } = await axios.get(`${BASE_URL}/auth/refresh?refresh-token=${token}`)
        if(!data) throw new Error

        return data
    } catch (error) {
        return null
    }
}

async function getProfile() {
    try {
        const { data } = await axios.get(`${BASE_URL}/user/profile`)
        if(!data) throw new Error

        return data
    } catch (error) {
        return null
    }
}

export {
    signUp,
    signIn,
    refreshToken,
    getProfile
}