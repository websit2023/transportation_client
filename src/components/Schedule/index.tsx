import { FunctionComponent } from "react";
import { ScheduleInterface } from "../../pages/SchedulePage";
import "./styles.css"
import { convertDate, convertDateToTime } from "../../utils/date-time";

interface ScheduleItemProps {
    schedule: ScheduleInterface
    pickTrip: (schedule: ScheduleInterface) => void
}

const ScheduleItem: FunctionComponent<ScheduleItemProps> = ({ schedule, pickTrip }) => {
    return (
        <div className="single-destinations" onClick={() => pickTrip(schedule)}>
            <div className="thumb">
                <img src={schedule.vehicle.image} alt="" />
            </div>
            <div className="details">
                <h4>{schedule.route.route_name}</h4>
                <p>
                    Vehicle name: {schedule.vehicle.vehicle_name}
                </p>
                <ul className="package-list">
                    <li className="d-flex justify-content-between align-items-center">
                        <span>Start point</span>
                        <span>{schedule.route.start_point}</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                        <span>End point</span>
                        <span>{schedule.route.end_point}</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                        <span>Time</span>
                        <span>{convertDate(schedule.start_time)} - {convertDateToTime(schedule.start_time)}</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                        <span>Seats</span>
                        <span>{schedule.vehicle.seats}</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                        <span>Price per person</span>
                        <a href="#" className="price-btn">${schedule.route.fare}</a>
                    </li>
                </ul>
            </div>
        </div >
    );
}

export default ScheduleItem;