import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { IoCloseOutline } from 'react-icons/io5'
import { useRef, useState, useEffect } from "react"
import { useResolvedPath, useMatch, Link, useLocation } from 'react-router-dom'
import axios from '../../axios'
import moment from 'moment'
import { arabicPeriods } from '../../utils/Helper'
import MobileSidebar from './MobileSidebar'
import { Progress } from '@chakra-ui/react'
import SearchField from '../../components/SearchField'

function MobileBookings() {

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
                            'start_time': start_time,
                            'end_time': end_time,
                        },
                        'customer': {
                            'id': booking.customer?.id,
                            'name': booking.customer?.name,
                            'phone_number': booking.customer?.phone_number
                        },
                        'total_price': booking.total_price
                    }

                    allBookings.push(bookingTemplate)

                });
                setBookings(allBookings)
            } catch (error) {
                setError(true)
            }
            setIsLoading(false)
        }
        getBookings()
    }, [])

    const nav = useRef()
    const body = document.getElementById('body')
    const location = useLocation()

    const toggleNavbar = () => {
        nav.current.classList.toggle('show-navbar')
        if (nav.current.classList.contains('show-navbar')) {
            body.style.overflow = "hidden"
        } else {
            body.style.overflow = "auto"
        }
    }

    useEffect(() => {
        body.style.overflow = 'auto'
    }, [location])


    return (
        <>
            <div className='dashboard-mobile din-next'>
                <div className='dashboard-header-mobile'>
                    <div className='d-flex justify-content-between'>
                        <div className='dashboard-title-mobile'>
                            قائمة الحجوزات
                        </div>
                        <button className="dashboard-menu-btn dashoboard-nav-btn" onClick={toggleNavbar}>
                            <HiOutlineMenuAlt2 size={'2rem'} />
                        </button>
                    </div>

                    <div className="mt-5">
                        <SearchField
                            onChange={(e) => setSearchKey(e.target.value)}
                            placeholder="ابحث برقم الحجز أو رقم هاتف العميل" />
                    </div>


                    <MobileSidebar nav={nav} toggleNavbar={toggleNavbar} />

                </div>
                <div className='dashboard-content-mobile'>
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
                            <table className="table mobile-table">
                                <thead>
                                    <tr>
                                        <th>رقم الحجز</th>
                                        <th>العميل والحفلة</th>
                                        <th>التاريخ والوقت</th>
                                        <th>الاجمالي</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
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
                                                    {booking.booking_number}#
                                                </td>
                                                <td>
                                                    <a href={`https://api.whatsapp.com/send/?phone=966${booking.customer.phone_number.substring(1, 10)}&text&type=phone_number&app_absent=0`} className='text-primary' target={'_blank'}>
                                                        {booking.customer.phone_number}</a> <br />
                                                    {booking.event.id}#
                                                </td>
                                                <td>
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
                                                </td>
                                                <td>{booking.total_price} ر.س</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default MobileBookings