import { useCallback, useEffect, useState } from "react";
import MainLayOut from "../layout/Main";
import { getAllSchedule, searchSchedule } from "../services/schedule.service";
import ScheduleItem from "../components/Schedule";
import { useSearchParams } from "react-router-dom";
import { provinces } from "../assets/data/provinces";
import TripPicker from "../components/TripPicker";

interface RouteInterface {
    route_name: string
    start_point: string
    end_point: string
    distance: number
    fare: number
}

interface VehicleInterface {
    vehicle_name: string,
    image: string,
    seats: number,
    year: number,
    status: "available" | "unavailable"
}

export interface ScheduleInterface {
    _id: string,
    start_time: Date,
    end_time: Date,
    route: RouteInterface
    vehicle: VehicleInterface
    available_seats: {seat_number: number, available: boolean}[]
}

function SchedulePage() {
    const [schedules, setSchedules] = useState<ScheduleInterface[]>([])
    const [selected, setSelected] = useState<ScheduleInterface | null>(null)

    const [searchParams] = useSearchParams()

    const pickTrip = useCallback((schedule: ScheduleInterface) => {
        setSelected(schedule)
    }, [])

    const closeTripPicker = useCallback(() => {
        setSelected(null)
    }, [])

    useEffect(() => {
        (async () => {
            const start_point = provinces.find(pr => pr.provinceId === Number(searchParams.get('start_point')))?.name
            const end_point = provinces.find(pr => pr.provinceId === Number(searchParams.get('end_point')))?.name
            const start_time = searchParams.get('start_time')

            if (start_point && end_point && start_time) {
                const data = await searchSchedule({ start_point, start_time, end_point })
                setSchedules(data)
                return;
            }

            const data = await getAllSchedule()
            setSchedules(data)
        })()
    }, [])

    return (
        <MainLayOut>
            <section className="destinations-area section-gap">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="menu-content pb-40 col-lg-8">
                            <div className="title text-center">
                                <h1 className="mb-10">Popular Destinations</h1>
                                <p>We all live in an age that belongs to the young at heart. Life that is becoming extremely fast, day to.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {schedules.map((schedule, index) => (
                            <div className="col-lg-4 col-md-6 col-12" key={`schedule_item_${index}`}>
                                <ScheduleItem 
                                    schedule={schedule} 
                                    pickTrip={pickTrip}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <TripPicker 
                    schedule={selected}
                    closeModal={closeTripPicker}
                />
            </section>
        </MainLayOut>
    );
}

export default SchedulePage;