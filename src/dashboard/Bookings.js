import DashboardLayout from "./DashboardLayout"
import { useEffect, useState } from "react"
import axios from '../axios'
import moment from "moment"
import MobileBookings from "./mobile/MobileBookings"
import SearchField from "../components/SearchField"
import { Progress } from '@chakra-ui/react'

function Bookings() {
    const [bookings, setBookings] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [searchKey, setSearchKey] = useState('')

    useEffect(() => {
        async function getBookings() {
            try {
                const response = await axios.get('/bookings')

                const allBookings = []

                response.data.data.forEach(booking => {
                    const date = moment(booking.event?.date)
                    const start_time = moment(booking.event?.start_time)
                    const end_time = moment(booking.event?.end_time)

                    if (end_time.isBefore(start_time)) {
                        end_time.add(1, 'day')
                    }

                    const bookingTemplate = {
                        'id': booking.id,
                        'booking_number': booking.booking_number,
                        'event': {
                            'id': booking.event?.id,
                            'date': date.format('YYYY-MM-DD'),
                            'start_time': start_time.format('hh:mm'),
                            'end_time': end_time.format('hh:mm'),
                        },
                        'customer': {
                            'id': booking.customer?.id,
                            'name': booking.customer?.name,
                            'phone_number': booking.customer?.phone_number
                        },
                        'total_price': booking.total_price
                    }

                    allBookings.push(bookingTemplate)
                })
                setBookings(allBookings)
            } catch (error) {
                setError(true)
            }
            setIsLoading(false)
        }
        getBookings()
    }, [])

    return (
        <>
            <DashboardLayout>
                <div className="dashboard-content">
                    <div className="fs-3 mb-5">قائمة الحجوزات</div>
                    <SearchField
                        onChange={(e) => setSearchKey(e.target.value)}
                        placeholder="ابحث برقم الحجز أو رقم هاتف العميل" />

                    <div className="my-5">
                        <div className="table-wrapper">
                            {
                                isLoading && <Progress size='xs' isIndeterminate />
                            }
                            {
                                error &&
                                <div className="text-center">
                                    حصل خطأ ما عند جلب البيانات, تأكد من اتصالك بالانترنت
                                </div>
                            }
                            {
                                (!isLoading && !error) &&
                                <table className="table">
                                    <tbody>
                                        {
                                            bookings.length === 0 ?
                                                <div className="text-center text-muted">
                                                    لا توجد حجوزات بعد
                                                </div> :
                                                bookings.filter((booking) => {
                                                    if (searchKey === '')
                                                        return booking
                                                    else if (booking.id.toString().includes(searchKey) ||
                                                        booking.customer.phone_number.toLowerCase().includes(searchKey.toLowerCase())) {
                                                        return booking
                                                    }
                                                }).map((booking) => (

                                                    <tr key={booking.id} className="table-card fs-7">
                                                        <td>{booking.id}#</td>
                                                        <td>
                                                            الحفلة: {booking.event.id} <br />
                                                            رقم العميل: <a href={`https://api.whatsapp.com/send/?phone=966${booking.customer.phone_number.substring(1, 10)}&text&type=phone_number&app_absent=0`} className='text-primary' target={'_blank'}>
                                                                {booking.customer.phone_number}
                                                            </a>
                                                        </td>
                                                        <td>
                                                            {booking.event.date} <br />
                                                            {booking.event.start_time} - {booking.event.end_time}
                                                        </td>
                                                        <td>
                                                            الطاولة: {booking.table} <br />
                                                            الإجمالي: {booking.total_price}
                                                        </td>
                                                        <td>جديدة</td>
                                                    </tr>
                                                ))}

                                    </tbody>
                                </table>
                            }

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