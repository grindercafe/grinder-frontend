import DashboardLayout from "./DashboardLayout"
import { useEffect, useState } from "react"
import axios from '../axios'
import moment from "moment"
import { IoCloseOutline } from 'react-icons/io5'
import MobileEvents from "./mobile/MobileEvents"

function Events() {
    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getEvents() {
            const response = await axios.get('/events')

            const all_events = []

            response.data.data.forEach(event => {

                const date = moment(event.date)
                const start_time = moment(event.start_time)
                const end_time = moment(event.end_time)

                if (end_time.isBefore(start_time)) {
                    end_time.add(1, 'day')
                }

                const eventTemplate = {
                    'id': event.id,
                    'date': date.format('YYYY-MM-DD'),
                    'start_time': start_time.format('hh:mm'),
                    'end_time': end_time.format('hh:mm'),
                    'singer_name': event.singer_name,
                    'singer_img': event.singer_img,
                    'available_seats': event.available_chairs,
                    'price_per_person': event.price_per_person
                }

                all_events.push(eventTemplate)

            })
            setEvents(all_events)
            setIsLoading(false)
            return response
        }
        getEvents()
    }, [])


    return (
        <>
            <DashboardLayout>
                <div className="dashboard-content">
                    <div className="fs-2 mb-5 d-flex justify-content-between align-items-center">
                        <div>قائمة الحفلات</div>
                        <button className="btn btn-transparent border-prime w-10 fs-7" data-bs-toggle="modal" data-bs-target="#exampleModal">اضافة حفلة</button>
                    </div>
                    <div className="d-flex mb-4">
                        <input className="form-control fs-7 ms-3" type="search" name="event-search" id="event-search" placeholder="بحث" />
                        <button className="btn btn-transparent border-prime w-10 ms-3 fs-7">ترتيب</button>
                        <button className="btn btn-transparent border-prime w-10 fs-7">تصفية</button>
                    </div>
                    <div className="d-flex justify-content-between mb-4">
                        <div>
                            <button className="btn btn-transparent border-prime ms-3  fs-7">تحديد الكل
                            </button>
                            <button className="btn btn-transparent border-prime ms-3 fs-7">إلغاء التحديد</button>
                            <button className="btn btn-primary ms-3 fs-7">تعديل</button>
                        </div>
                        <div>
                            <button className="btn btn-transparent border-prime fs-7">الخيارات</button>
                        </div>
                    </div>

                    <div className="my-5">
                        <div className="table-wrapper">
                            <table className="table">
                                <tbody>
                                    {events.map((event) => (

                                        <tr key={event.id} className="table-card fs-7">
                                            <td scope="row">
                                                <input type="checkbox" name="event" id="event" />
                                            </td>
                                            <td>
                                                {event.id}# <br />
                                                الفنان: {event.singer_name}
                                            </td>
                                            <td>
                                                {event.date} <br />
                                                {event.start_time} - {event.end_time}
                                            </td>
                                            <td>عدد المقاعد: {event.available_seats}</td>
                                            <td>السعر للشخص: {event.price_per_person}</td>
                                            <td>جديدة</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            {/* <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div> */}
                            <div className="modal-body text-black" style={{backgroundColor: '#F3EEE9'}}>
                                <div className="d-flex justify-content-center align-items-center">
                                    <button className="modal-close-btn" data-bs-dismiss="modal">
                                        <IoCloseOutline size={'2.2rem'} />
                                    </button>
                                    <div className="nebras fs-5">حفلة جديدة</div>
                                </div>
                                <form method="POST" className="px-5 py-3 add-event-form">

                                    <label htmlFor="singer_name" className="form-label">اسم المغني</label>
                                    <input type={"text"} className="form-control mb-4" />

                                    <label htmlFor="date" className="form-label">التاريخ</label>
                                    <input type={'date'} className="form-control mb-4" />

                                    <div className="d-flex justify-content-between mb-4">
                                        <div className="col-5">
                                            <label htmlFor="start-time" className="form-label">من</label>
                                            <input type={'time'} className="form-control" />
                                        </div>
                                        <div className="col-5">
                                            <label htmlFor="end-time" className="form-label">إلى</label>
                                            <input type={'time'} className="form-control" />
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <label htmlFor="singer-img" className="form-label">صورة الفنان</label>
                                        <input type={'file'} className="form-control w-50" />
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <label htmlFor="available_seats" className="form-label">عدد المقاعد</label>
                                        <input type={'number'} className="form-control w-50" dir="ltr" />
                                    </div>
                                    
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <label htmlFor="price" className="form-label">سعر المقعد</label>
                                        <input type={'number'} className="form-control w-50" dir="ltr" />
                                    </div>
                                    
                                    <div className="d-flex justify-content-center nebras">
                                        <button className="btn btn-primary px-5 py-2 fs-5">إضافة</button>
                                    </div>

                                </form>
                            </div>
                            {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div> */}
                        </div>
                    </div>
                </div>
            </DashboardLayout>

            <div className="d-lg-none">
                <MobileEvents />
            </div>
        </>
    )
}

export default Events