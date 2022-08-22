import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { IoCloseOutline } from 'react-icons/io5'
import { useRef, useState, useEffect } from "react"
import { useResolvedPath, useMatch, Link, useLocation } from 'react-router-dom'
import axios from '../../axios'
import moment from 'moment'
import { arabicPeriods } from '../../utils/Helper'
import MobileSidebar from './MobileSidebar'

function MobileBookings() {

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
                        'start_time': start_time,
                        'end_time': end_time,
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
            return response
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

                    <input className='form-control mt-4' type={'search'} name='search' placeholder='بحث' />


                    <MobileSidebar nav={nav} toggleNavbar={toggleNavbar} />

                </div>
                <div className='dashboard-content-mobile'>
                    <div className="table-wrapper">
                        <table className="table mobile-table">
                            <thead>
                                <tr>
                                    <th>رقم الحجز</th>
                                    <th>العميل والحفلة</th>
                                    <th>التاريخ والوقت</th>
                                    <th>المقاعد</th>
                                    <th>الاجمالي</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
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
                                        <td>{booking.party_size}</td>
                                        <td>{booking.total_price} ر.س</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MobileBookings