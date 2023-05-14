import { FunctionComponent } from "react";
import { ScheduleInterface } from "../../pages/SchedulePage";
import "./styles.css"
import { convertDate, convertDateToTime } from "../../utils/date-time";

interface DriverTaskProps {
    schedule: ScheduleInterface
}

const DriverTask: FunctionComponent<DriverTaskProps> = ({ schedule }) => {
    return (
        <div className="driver-task">
            <h1>{schedule.route.route_name}</h1>
            <p>{schedule.vehicle.vehicle_name}</p>
            <p>{convertDate(schedule.start_time)} - {convertDateToTime(schedule.start_time)}</p>
        </div>
    );
}

export default DriverTask;