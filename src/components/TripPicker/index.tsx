import { FunctionComponent, useCallback, useState } from "react";
import Modal from 'react-modal';
import { ScheduleInterface } from "../../pages/SchedulePage";
import { CgEditBlackPoint } from 'react-icons/cg'
import { MdOutlinePlace } from 'react-icons/md'
import { FaAngleDoubleDown } from 'react-icons/fa'
import "./styles.css"
import { convertDateToTime } from "../../utils/date-time";
import Chair from "./Chair";
import { useOrder } from "../../contexts/order.context";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";


interface TripPickerProps {
    schedule: ScheduleInterface | null,
    closeModal: () => void
}

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '350px',
    },
};

const TripPicker: FunctionComponent<TripPickerProps> = ({ schedule, closeModal }) => {
    const [selectedSeats, setSelectedSeats] = useState<{ seat_number: number, available: boolean }[]>([])

    const { addNewOrder } = useOrder()
    const navigate = useNavigate()
    const { user } = useAuth()

    const selectSeat = useCallback((seat: { seat_number: number, available: boolean }) => {
        const seatIndex = selectedSeats.indexOf(seat);
        if (seatIndex === -1) {
            setSelectedSeats(prevS => [...prevS, seat]);
        } else {
            const seats = [...selectedSeats];
            setSelectedSeats(seats.filter(s => s !== seat));
        }
    }, [selectedSeats])
    
    if (!schedule) return null;

    const onCreateOrder = () => {
        addNewOrder({
            scheduleId: schedule._id,
            selectedSeats,
            totalPrice: selectedSeats.length * schedule.route.fare
        })
        navigate("/checkout")
    }

    const checkBookableSeat = (): boolean => {         
        if(!user || !user.customer) return true;                  
        if(new Date(schedule.start_time) < new Date()) return true          
        return false     
    }
 
    return (
        <Modal
            isOpen={schedule !== null}
            onRequestClose={closeModal}
            style={customStyles}
            overlayClassName={"overlay-trip-picker"}
            contentLabel="Example Modal"
        >
            <div className="trip-picker">
                <div className="vehicle">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                            <img src={schedule.vehicle.image} alt="vehicle" />
                        </div>
                        <div className="col-12 col-sm-12 col-md-8 col-lg-8">
                            <h5 className="vehicle-name d-flex justify-content-between">
                                <span>{schedule.vehicle.vehicle_name}</span>
                                <span>{schedule.route.fare}$</span>
                            </h5>
                            <p>
                                <CgEditBlackPoint size={20} />
                                <span>{convertDateToTime(schedule.start_time)} - {schedule.route.start_point}</span>
                            </p>
                            <div className="mark-down"><FaAngleDoubleDown size={20} /></div>
                            <p>
                                <MdOutlinePlace size={20} />
                                <span>{convertDateToTime(schedule.end_time)} - {schedule.route.end_point}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="chair-selector">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-6">
                            <div className="guide">
                                <div className="guide-item">
                                    <div className="chair">
                                        <svg width="32" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 27, height: 40 }}>
                                            <rect x="2.75" y="2.75" width="22.5" height="34.5" rx="2.25" fill="#FFF" stroke="#B8B8B8" strokeWidth="1.5" strokeLinejoin="round"></rect>
                                            <rect x="5.75" y="27.75" width="16.5" height="6.5" rx="2.25" fill="#FFF" stroke="#B8B8B8" strokeWidth="1.5" strokeLinejoin="round"></rect>
                                            <path className="icon-selected" d="M14 8.333A6.67 6.67 0 0 0 7.333 15 6.67 6.67 0 0 0 14 21.667 6.67 6.67 0 0 0 20.667 15 6.669 6.669 0 0 0 14 8.333zm-1.333 10L9.334 15l.94-.94 2.393 2.387 5.06-5.06.94.946-6 6z" fill="transparent"></path>
                                            <path className="icon-disabled" d="M18.96 11.46l-1.42-1.42L14 13.59l-3.54-3.55-1.42 1.42L12.59 15l-3.55 3.54 1.42 1.42L14 16.41l3.54 3.55 1.42-1.42L15.41 15l3.55-3.54z" fill="transparent"></path>
                                        </svg>
                                    </div>
                                    <div className="chair-info">
                                        <p>Available seat</p>
                                        <span>Price: {schedule.route.fare}$</span>
                                    </div>
                                </div>
                                <div className="guide-item">
                                    <div className="chair chair--selecting">
                                        <svg width="32" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 27, height: 40 }}>
                                            <rect x="2.75" y="2.75" width="22.5" height="34.5" rx="2.25" fill="#FFF" stroke="#B8B8B8" strokeWidth="1.5" strokeLinejoin="round"></rect>
                                            <rect x="5.75" y="27.75" width="16.5" height="6.5" rx="2.25" fill="#FFF" stroke="#B8B8B8" strokeWidth="1.5" strokeLinejoin="round"></rect>
                                            <path className="icon-selected" d="M14 8.333A6.67 6.67 0 0 0 7.333 15 6.67 6.67 0 0 0 14 21.667 6.67 6.67 0 0 0 20.667 15 6.669 6.669 0 0 0 14 8.333zm-1.333 10L9.334 15l.94-.94 2.393 2.387 5.06-5.06.94.946-6 6z" fill="transparent"></path>
                                            <path className="icon-disabled" d="M18.96 11.46l-1.42-1.42L14 13.59l-3.54-3.55-1.42 1.42L12.59 15l-3.55 3.54 1.42 1.42L14 16.41l3.54 3.55 1.42-1.42L15.41 15l3.55-3.54z" fill="transparent"></path>
                                        </svg>
                                    </div>
                                    <div className="chair-info">
                                        <p>Selecting seat</p>
                                        <span>Price: {schedule.route.fare}$</span>
                                    </div>
                                </div>
                                <div className="guide-item">
                                    <div className="chair chair--selected">
                                        <svg width="32" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 27, height: 40 }}>
                                            <rect x="2.75" y="2.75" width="22.5" height="34.5" rx="2.25" fill="#FFF" stroke="#B8B8B8" strokeWidth="1.5" strokeLinejoin="round"></rect>
                                            <rect x="5.75" y="27.75" width="16.5" height="6.5" rx="2.25" fill="#FFF" stroke="#B8B8B8" strokeWidth="1.5" strokeLinejoin="round"></rect>
                                            <path className="icon-selected" d="M14 8.333A6.67 6.67 0 0 0 7.333 15 6.67 6.67 0 0 0 14 21.667 6.67 6.67 0 0 0 20.667 15 6.669 6.669 0 0 0 14 8.333zm-1.333 10L9.334 15l.94-.94 2.393 2.387 5.06-5.06.94.946-6 6z" fill="transparent"></path>
                                            <path className="icon-disabled" d="M18.96 11.46l-1.42-1.42L14 13.59l-3.54-3.55-1.42 1.42L12.59 15l-3.55 3.54 1.42 1.42L14 16.41l3.54 3.55 1.42-1.42L15.41 15l3.55-3.54z" fill="transparent"></path>
                                        </svg>
                                    </div>
                                    <div className="chair-info">
                                        <p>Selected seat</p>
                                        <span>Price: {schedule.route.fare}$</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-6">
                            <div className="virtual-vehicle">
                                <div className="top-chair">
                                    <h6>Top Chair</h6>
                                    <div className="chairs">
                                        {schedule.available_seats.slice(0, Math.round(schedule.available_seats.length / 2)).map((seat, index) => (
                                            <div className="chair-item" key={`chair_${index + 1}`}>
                                                <Chair chair={seat} selectSeat={selectSeat} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bot-chair">
                                    <h6>Bot Chair</h6>
                                    <div className="chairs">
                                        {schedule.available_seats.slice(Math.round(schedule.available_seats.length / 2), schedule.available_seats.length).map((seat, index) => (
                                            <div className="chair-item" key={`chair_${index + 1}`}>
                                                <Chair chair={seat} selectSeat={selectSeat} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="subscription">
                    <div className="total-price">
                        Total: <span>{selectedSeats.length * schedule.route.fare}$</span>
                    </div>
                    <div className={checkBookableSeat() ? "submit submit--disable" : "submit"}>
                        <button onClick={onCreateOrder} disabled={checkBookableSeat()}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default TripPicker;