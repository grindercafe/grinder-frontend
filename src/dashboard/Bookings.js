import DashboardLayout from "./DashboardLayout"
import { useEffect, useState } from "react"
import axios from '../axios'
import moment from "moment"
import MobileBookings from "./mobile/MobileBookings"
import SearchField from "../components/SearchField"
import { Progress } from '@chakra-ui/react'
import AuthProvider from "../components/AuthProvider"
import { Link } from "react-router-dom"


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
                            'singer_name': booking.event?.singer_name,
                        },
                        'customer': {
                            'id': booking.customer?.id,
                            'name': booking.customer?.name,
                            'phone_number': booking.customer?.phone_number
                        },
                        'total_price': booking.total_price,
                        'payment': booking.payment?.status,
                        'created_at': moment(booking.created_at).format("YYYY-MM-DD hh:mmA")
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

    const handleDelete = async (id) => {
        if (window.confirm('هل انت متأكد من حذف الحجز ؟') == true) {
            try {
                const response = await axios.delete('/bookings/' + id)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
            window.location.reload(false);
        }

    }

    return (
        <>
            <AuthProvider>
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
                                        <thead>
                                            <tr>
                                                <th className="p-3 fs-7">رقم الحجز</th>
                                                <th className="p-3 fs-7">العميل والحفلة</th>
                                                <th className="p-3 fs-7">حالة الدفع</th>
                                                <th className="p-3 fs-7">الاجمالي</th>
                                                <th className="p-3 fs-7"> مضى عليه </th>
                                                <th className="p-3 fs-7">خيارات</th>
                                            </tr>
                                        </thead>
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
                                                            <td>
                                                                {booking.id}#
                                                            </td>
                                                            <td>
                                                                <a href={`https://api.whatsapp.com/send/?phone=966${booking.customer.phone_number.substring(1, 10)}&text&type=phone_number&app_absent=0`} className='text-primary' target={'_blank'}>
                                                                    {booking.customer.phone_number}</a> <br />
                                                                #<Link to={`/events/${booking.event.id}`} className='text-primary'>{booking.event.singer_name}</Link>
                                                            </td>
                                                            <td>{booking.payment}</td>
                                                            {/* <td>
                                                        {booking.event.date} <br />
                                                        <div className='d-flex'>
                                                            <div>
                                                                <div>{booking.event.start_time.format('hh:mm')}</div>
                                                                <div>{arabicPeriods(booking.event.start_time.format('A'))}</div>
                                                            </div>
                                                            -
                                                            <div>
                                                                <div>{booking.event.end_time.format('hh:mm')}</div>
                                                                <div>{arabicPeriods(booking.event.end_time.format('A'))}</div>
                                                            </div>
                                                        </div>
                                                    </td> */}
                                                            <td>{booking.total_price} ر.س</td>
                                                            <td>{booking.created_at}</td>
                                                            <td className='text-danger'>
                                                                <button onClick={() => handleDelete(booking.id)}>حذف</button>
                                                            </td>
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
            </AuthProvider>

        </>
    )
}

export default Bookings