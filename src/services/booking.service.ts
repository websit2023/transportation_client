import axios from "axios"
import { BASE_URL } from "../constants/server"

async function createBooking(booking: any) {
    try {
        const { data } = await axios.post(`${BASE_URL}/booking/create`, booking)
        return data
    } catch (error) {
        return null
    }
}

async function getBookingList() {
    try {
        const { data } = await axios.get(`${BASE_URL}/booking/getUserBooking`)
        return data
    } catch (error) {
        return []
    }
}

export {
    createBooking,
    getBookingList
}