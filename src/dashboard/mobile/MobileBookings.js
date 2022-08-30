import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { useRef, useState, useEffect } from "react"
import { Link, useLocation } from 'react-router-dom'
import axios from '../../axios'
import moment from 'moment'
import MobileSidebar from './MobileSidebar'
import { Progress, useToast, Alert, AlertIcon, CloseButton } from '@chakra-ui/react'
import SearchField from '../../components/SearchField'

function MobileBookings() {

    const [bookings, setBookings] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [searchKey, setSearchKey] = useState('')
    const [isUpdatePaymentLoading, setIsUpdatePaymentLoading] = useState(false)
    const toast = useToast()
    const [isDeleted, setIsDeleted] = useState(false)


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
                            'singer_name': booking.event?.singer_name,
                        },
                        'customer': {
                            'id': booking.customer?.id,
                            'name': booking.customer?.name,
                            'phone_number': booking.customer?.phone_number
                        },
                        'total_price': booking.total_price,
                        'payment': booking.payment?.status,
                        'created_at': moment(booking.created_at).format("YYYY-MM-DD hh:mmA"),
                        'tables': booking.tables
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
    }, [isUpdatePaymentLoading, isDeleted])

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

    const handleDelete = async (id) => {
        setIsDeleted(true)
        if (window.confirm('هل انت متأكد من حذف الحجز ؟') == true) {
            try {
                const response = await axios.delete('/bookings/' + id)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        setIsDeleted(false)
    }


    async function updatePaymentStatus() {
        setIsUpdatePaymentLoading(true)
        try {
            const response = await axios.get('/update_payment_status')
            setIsUpdatePaymentLoading(false)
            return toast({
                render: () => (
                    <Alert status={'success'} variant='left-accent' color={'black'}>
                        <AlertIcon />
                        <div className="ps-5 pe-3 fs-7">
                            {'تم التحقق'}
                        </div>

                        <CloseButton position={'absolute'} left={'2'} onClick={() => toast.closeAll()} />
                    </Alert>

                ),
                duration: 5000,
                position: 'top-left',
            })
        } catch (error) {
            setIsUpdatePaymentLoading(false)
            return toast({
                render: () => (
                    <Alert status={'error'} variant='left-accent' color={'black'}>
                        <AlertIcon />
                        <div className="ps-5 pe-3 fs-7">
                            {'حصل خطأ ما, حاول مجدداً لاحقاً'}
                        </div>

                        <CloseButton position={'absolute'} left={'2'} onClick={() => toast.closeAll()} />
                    </Alert>

                ),
                duration: 5000,
                position: 'top-left',
            })
        }
    }


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
                            placeholder="ابحث برقم الحجز أو رقم هاتف العميل أو اسم الفنان" />
                    </div>

                    <button className='btn add-event-btn' onClick={updatePaymentStatus}>التحقق من الحجوزات المعلّقة</button>

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
                                        <th>حالة الدفع</th>
                                        <th>الطاولات</th>
                                        <th>الاجمالي</th>
                                        <th>مضى عليه</th>
                                        <th>خيارات</th>
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
                                                else if (
                                                    booking.id.toString().includes(searchKey) ||
                                                    booking.customer.phone_number.toLowerCase().includes(searchKey.toLowerCase()) ||
                                                    booking.event.singer_name.toLowerCase().includes(searchKey.toLowerCase())
                                                ) {
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
                                                    <td>
                                                        {
                                                            booking.tables.map((table) => (
                                                                table.number + ','
                                                            ))
                                                        }
                                                    </td>
                                                    <td>{booking.total_price} ر.س</td>
                                                    <td>{booking.created_at}</td>
                                                    <td>
                                                        {
                                                            booking.payment != 'paid' &&
                                                            <button className='text-danger' onClick={() => handleDelete(booking.id)}>حذف</button>
                                                        }
                                                    </td>
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