import { FunctionComponent } from "react";
import "./styles.css"
import { ScheduleInterface } from "../../pages/SchedulePage";
import { convertDate, convertDateToTime } from "../../utils/date-time";

interface TicketProps {
    ticket: BookingInterface
}

interface BookedSeat {
    seat_number: number
}

export interface BookingInterface {
    schedule: ScheduleInterface,
    customer: string,
    passenger_name: string
    passenger_phone: string
    passenger_age: number
    booked_seats: BookedSeat[]
    total_fare: number
    created_at: Date
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const Ticket: FunctionComponent<TicketProps> = ({ ticket }) => {
    return (
        <div className="ticket">
            <article className="card fl-left">
                <section className="date">
                    <time dateTime="23th feb">
                        <span>{new Date(ticket.created_at).getDate()}</span>
                        <span>{months[new Date(ticket.created_at).getUTCMonth()]}</span>
                    </time>
                </section>
                <section className="card-cont">
                    <small>Transportation Service</small>
                    <h3>Travel Ticket</h3>
                    <div className="even-date">
                        <i className="fa fa-calendar" />
                        <time>
                            <span>{convertDate(ticket.schedule.start_time)} - {convertDateToTime(ticket.schedule.start_time)}</span>
                            <span>Booked chair with these number: {ticket.booked_seats.map(seat => `${seat.seat_number}, `)}</span>
                        </time>
                    </div>
                    <div className="even-info">
                        <i className="fa fa-map-marker" />
                        <p>
                            {ticket.passenger_name} - {ticket.passenger_age}
                        </p>
                    </div>
                </section>
            </article>
        </div>
    );
}

export default Ticket;