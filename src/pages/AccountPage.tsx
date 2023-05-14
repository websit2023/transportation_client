import { useEffect, useState } from "react";
import MainLayOut from "../layout/Main";
import "../styles/account-page.css"
import Profile from "../components/Profile";
import { useAuth } from "../contexts/auth.context";
import { useNavigate } from "react-router-dom";
import Ticket, { BookingInterface } from "../components/Ticket";
import { getBookingList } from "../services/booking.service";
import { Roles } from "../components/SignUp"
import { ScheduleInterface } from "./SchedulePage";
import { getDriverSchedules } from "../services/schedule.service";
import DriverTask from "../components/DriverTask";

export interface UserInterface {
    _id: string
    email: string
    password: string
    role: Roles | ""
    driver?: {
        driver_name: string
        phone_number: string
        address?: string
    }
    customer?: {
        customer_name: string
        phone_number: string
        year_of_birth?: number
        address?: string
    }
}

function AccountPage() {
    const [tabs, setTabs] = useState<number>(0)
    const [bookings, setBookings] = useState<BookingInterface[]>([])
    const [schedules, setSchedules] = useState<ScheduleInterface[]>([])

    const { user } = useAuth()
    const navigate = useNavigate()

    const getSchedules = async () => {
        const data = await getDriverSchedules()
        setSchedules(data)
    }

    const getBookings = async () => {
        const data = await getBookingList()
        setBookings(data)
    }

    useEffect(() => {
        getBookings()
        getSchedules()
    }, [])

    if (!user) {
        navigate("/sign-in")
        return null
    }

    return (
        <MainLayOut>
            <div className="account">
                <div className="container">
                    <div className="bg-white shadow rounded-lg d-block d-sm-flex">
                        <div className="profile-tab-nav border-right">
                            <div className="p-4">
                                <div className="img-circle text-center mb-3">
                                    <img src="img/user2.jpg" alt="Image" className="shadow" />
                                </div>
                                <h4 className="text-center">{user.email}</h4>
                            </div>
                            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <a className={tabs === 0 ? "nav-link active" : "nav-link"} id="account-tab" data-toggle="pill" href="#account" role="tab" onClick={() => setTabs(0)}>
                                    <i className="fa fa-home text-center mr-1" />
                                    Account
                                </a>
                                {user.role === Roles.Driver
                                    ? (
                                        <a className={tabs === 1 ? "nav-link active" : "nav-link"} id="application-tab" data-toggle="pill" href="#schedule" role="tab" onClick={() => setTabs(1)}>
                                            <i className="fa fa-tv text-center mr-1" />
                                            Schedule
                                        </a>
                                    )
                                    : null
                                }
                                <a className={tabs === 2 ? "nav-link active" : "nav-link"} id="notification-tab" data-toggle="pill" href="#order" role="tab" onClick={() => setTabs(2)}>
                                    <i className="fa fa-bell text-center mr-1" />
                                    Order
                                </a>
                            </div>
                        </div>
                        <div className="tab-content p-4 p-md-5" id="v-pills-tabContent">
                            {tabs === 0
                                ? <Profile user={user} />
                                : null
                            }
                            {tabs === 1
                                ? (schedules.map((schedule, index) => (
                                    <DriverTask schedule={schedule} key={`driver_schedule_${index}`} />
                                )))
                                : null
                            }
                            {tabs === 2
                                ? (bookings.map((booking, index) => (
                                    <Ticket ticket={booking} key={`ticket_${index}`} />
                                )))
                                : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </MainLayOut>
    );
}

export default AccountPage;