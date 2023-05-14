import axios from "axios"
import { BASE_URL } from "../constants/server"

async function updateCustomerProfile(profile: any) {
    try {
        const { data } = await axios.put(`${BASE_URL}/user/updateProfile/customer`, profile)
        return data
    } catch (error) {
        return null
    }
}

async function updateDriverProfile(profile: any) {
    try {
        const { data } = await axios.put(`${BASE_URL}/user/updateProfile/driver`, profile)
        return data
    } catch (error) {
        return null
    }
}

export {
    updateCustomerProfile,
    updateDriverProfile
}