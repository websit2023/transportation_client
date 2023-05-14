import { FormEvent, FunctionComponent, useState } from "react";
import DatePicker from 'react-datepicker';
import "./styles.css"
import { provinces } from "../../assets/data/provinces";
import { useNavigate } from "react-router-dom";
import { convertStringToDate } from "../../utils/date-time";

interface BannerProps {

}

const Banner: FunctionComponent<BannerProps> = () => {
    const [startPoint, setStartPoint] = useState<string>("")
    const [endPoint, setEndPoint] = useState<string>("")
    const [startTime, setStartTime] = useState<Date | null>(new Date());

    const navigate = useNavigate()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!startPoint || !endPoint || !startTime) return;
        navigate(`/schedule?start_point=${startPoint}&end_point=${endPoint}&start_time=${convertStringToDate(startTime.toISOString())}`)
    }

    return (
        < section className="banner-area relative" style={{ backgroundImage: 'url(../img/banner.jpg)' }}>
            {/* <div className="overlay overlay-bg" /> */}
            < div className="container" >
                <div className="row fullscreen align-items-center justify-content-between" style={{ height: '100vh' }}>
                    <div className="col-lg-6 col-md-6 banner-left">
                        <h6 className="text-white">Away from monotonous life</h6>
                        <h1 className="text-white">Magical Travel</h1>
                        <p className="text-white">
                            If you are looking at blank cassettes on the web, you may be very confused at the difference in price. You may see some for as low as $.17 each.
                        </p>
                        <a href="#" className="primary-btn text-uppercase" onClick={() => navigate('/schedule')}>Get Started</a>
                    </div>
                    <div className="col-lg-4 col-md-6 banner-right">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="flight-tab" data-toggle="tab" href="#flight" role="tab" aria-controls="flight" aria-selected="true">Bus Trips</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="hotel-tab" data-toggle="tab" href="#hotel" role="tab" aria-controls="hotel" aria-selected="false">Flights</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="holiday-tab" data-toggle="tab" href="#holiday" role="tab" aria-controls="holiday" aria-selected="false">Holidays</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="flight" role="tabpanel" aria-labelledby="flight-tab">
                                <form onSubmit={handleSubmit} className="form-wrap">
                                    <select value={startPoint} onChange={e => setStartPoint((e.target.value))}>
                                        <option value={""} disabled>Select start point</option>
                                        {provinces.map((province, index) => (
                                            <option key={index} value={province.provinceId}>{province.name}</option>
                                        ))}
                                    </select>
                                    <select value={endPoint} onChange={e => setEndPoint((e.target.value))}>
                                        <option value={""} disabled>Select end point</option>
                                        {provinces.map((province, index) => (
                                            <option key={index} value={province.provinceId}>{province.name}</option>
                                        ))}
                                    </select>
                                    <DatePicker
                                        selected={startTime}
                                        onChange={(date) => {
                                            setStartTime(date);
                                        }}
                                    />
                            
                                    <button type="submit" className="primary-btn text-uppercase">Search schedules</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    );
}

export default Banner;