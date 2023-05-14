import { ChangeEvent, useEffect, useState } from "react";
import MainLayOut from "../layout/Main";
import "../styles/checkout-page.css"
import { useAuth } from "../contexts/auth.context";
import { calculateAge } from "../utils/date-time";
import { useOrder } from "../contexts/order.context";
import { createBooking } from "../services/booking.service";
import { message } from 'antd';

interface Booking {
    schedule: string,
    customer: string,
    passenger_name: string
    passenger_phone: string
    passenger_age: number
    booked_seats: { seat_number: number, available: boolean }[]
    total_fare: number
}

const initialState: Booking = {
    schedule: "",
    customer: "",
    passenger_name: "",
    passenger_phone: "",
    passenger_age: 18,
    booked_seats: [],
    total_fare: 0
}

function CheckoutPage() {
    const [booking, setBooking] = useState<Booking>(initialState)

    const { user } = useAuth()
    const { order } = useOrder()

    useEffect(() => {
        if (user && user.customer && order) {
            const { customer_name, phone_number, year_of_birth } = user.customer

            setBooking(prevS => ({
                ...prevS,
                passenger_name: customer_name,
                passenger_phone: phone_number,
                passenger_age: calculateAge(year_of_birth || 2001),
                booked_seats: order.selectedSeats,
                schedule: order.scheduleId,
                customer: user._id,
                total_fare: order.totalPrice
            }))
        }
    }, [user, order])

    const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setBooking(prevS => ({
            ...prevS,
            [name]: value
        }))
    }

    const handleNumberInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setBooking(prevS => ({
            ...prevS,
            [name]: Number(value)
        }))
    }

    const createNewOrder = async () => {
        const newOrder = await createBooking(booking)
        if(!newOrder) {
            message.error("Booking failed. Please try again !")
            return;
        }

        message.success("Booking successfully !")
        setBooking(initialState)
    }

    return (
        <MainLayOut>
            <div className="checkout">
                <div className="container-fluid pt-5">
                    <div className="row px-xl-5">
                        <div className="col-lg-8">
                            <div className="mb-4">
                                <h4 className="font-weight-semi-bold mb-4">Billing Address</h4>
                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <label>Passenger name</label>
                                        <input
                                            className="form-control"
                                            name="passenger_name"
                                            type="text"
                                            placeholder="John"
                                            value={booking.passenger_name}
                                            onChange={handleTextInputChange}
                                        />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>Passenger phone</label>
                                        <input
                                            className="form-control"
                                            name="passenger_phone"
                                            type="text"
                                            placeholder="0987654321"
                                            value={booking.passenger_phone}
                                            onChange={handleTextInputChange}
                                        />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>Passenger age</label>
                                        <input
                                            className="form-control"
                                            name="passenger_age"
                                            type="number"
                                            placeholder="18"
                                            value={booking.passenger_age}
                                            onChange={handleNumberInputChange}
                                        />
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <label>Address</label>
                                        <input className="form-control" type="text" placeholder="123 Street" defaultValue={user?.customer?.address || ""} />
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <label>Email</label>
                                        <input className="form-control" type="text" placeholder="abc@xyz.com" defaultValue={user?.email || ""} />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-4">
                            <div className="card border-secondary mb-5">
                                <div className="card-header bg-secondary border-0">
                                    <h4 className="font-weight-semi-bold m-0">Order Total</h4>
                                </div>
                                <div className="card-body">
                                    <h5 className="font-weight-medium mb-3">Products</h5>
                                    {booking.booked_seats.length === 0
                                        ? (
                                            <div className="no-booked">
                                                You have not booked a trip yet
                                            </div>
                                        )
                                        : null
                                    }
                                    {booking.booked_seats.map((seat, index) => (
                                        <div className="d-flex justify-content-between" key={`order_seat_${index}`}>
                                            <p>Chair number {seat.seat_number}</p>
                                            <p>${(order?.totalPrice || 0) / booking.booked_seats.length}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="card-footer border-secondary bg-transparent">
                                    <div className="d-flex justify-content-between mt-2">
                                        <h5 className="font-weight-bold">Total</h5>
                                        <h5 className="font-weight-bold">${booking.total_fare || 0}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="card border-secondary mb-5">
                                <div className="card-header bg-secondary border-0">
                                    <h4 className="font-weight-semi-bold m-0">Payment</h4>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <div className="custom-control custom-radio d-flex align-items-center">
                                            <input type="radio" className="custom-control-input" name="payment" id="paypal" />
                                            <label className="custom-control-label" htmlFor="paypal">Paypal</label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="custom-control custom-radio d-flex align-items-center">
                                            <input type="radio" className="custom-control-input" name="payment" id="directcheck" />
                                            <label className="custom-control-label" htmlFor="directcheck">Direct Check</label>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="custom-control custom-radio d-flex align-items-center">
                                            <input type="radio" className="custom-control-input" name="payment" id="banktransfer" />
                                            <label className="custom-control-label" htmlFor="banktransfer">Bank Transfer</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer border-secondary bg-transparent">
                                    <button
                                        className={"btn btn-lg btn-block font-weight-bold my-3 py-3" + `${(!user || booking.booked_seats.length === 0) ? " btn-secondary" : " btn-primary"}`}
                                        disabled={(!user || booking.booked_seats.length === 0)}
                                        onClick={createNewOrder}
                                    >
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayOut>
    );
}

export default CheckoutPage;