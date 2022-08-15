import DashboardLayout from "./DashboardLayout"
import { useEffect, useState } from "react"
import axios from '../axios'
import moment from "moment"
import MobileBookings from "./mobile/MobileBookings"

function Bookings() {
    const [bookings, setBookings] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getBookings() {
            const response = await axios.get('/bookings')
            const allBookings = []

            response.data.data.forEach(booking => {
                const date = moment(booking.event.date)
                const start_time = moment(booking.event.start_time)
                const end_time = moment(booking.event.end_time)

                if (end_time.isBefore(start_time)) {
                    end_time.add(1, 'day')
                }

                const bookingTemplate = {
                    'id': booking.id,
                    'booking_number': booking.booking_number,
                    'event': {
                        'id': booking.event.id,
                        'date': date.format('YYYY-MM-DD'),
                        'start_time': start_time.format('hh:mm'),
                        'end_time': end_time.format('hh:mm'),
                    },
                    'customer': {
                        'id': booking.customer.id,
                        'name': booking.customer.name,
                        'phone_number': booking.customer.phone_number
                    },
                    'party_size': booking.party_size,
                    'total_price': booking.total_price
                }

                allBookings.push(bookingTemplate)

            });
            setBookings(allBookings)
            setIsLoading(false)
            return allBookings
        }
        getBookings()
    }, [])
    
    return (
        <>
            <DashboardLayout>
                <div className="dashboard-content">
                    <div className="fs-3 mb-5">قائمة الحجوزات</div>
                    <div className="d-flex mb-4">
                        <input className="form-control fs-7 ms-3" type="search" name="booking-search" id="booking-search" placeholder="بحث" />
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
                                    {bookings.map((booking) => (

                                        <tr key={booking.id} className="table-card fs-7">
                                            <td scope="row"><input type="checkbox" name="booking" id="booking" /></td>
                                            <td>{booking.booking_number}#</td>
                                            <td>
                                                الحفلة: {booking.event.id} <br />
                                                رقم العميل: {booking.customer.phone_number}
                                            </td>
                                            <td>
                                                {booking.event.date} <br />
                                                {booking.event.start_time } - { booking.event.end_time }
                                            </td>
                                            <td>
                                                المقاعد: { booking.party_size } <br />
                                                الإجمالي: { booking.total_price }
                                            </td>
                                            <td>جديدة</td>
                                            {/* <td>{customer.name}</td>
                                            <td>{customer.phone_number}</td>
                                            <td>3</td> */}
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </DashboardLayout>

            <div className="d-lg-none">
                <MobileBookings />
            </div>

        </>
    )
}

export default Bookings