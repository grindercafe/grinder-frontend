import DashboardLayout from "./DashboardLayout"
import { useEffect, useState } from "react"
import axios from '../axios'
import moment from "moment"
import MobileBookings from "./mobile/MobileBookings"
import SearchField from "../components/SearchField"
import AuthProvider from "../components/AuthProvider"
import { Link, useNavigate } from "react-router-dom"
import { Progress, useToast, Alert, AlertIcon, CloseButton, Tooltip } from '@chakra-ui/react'
import { HiOutlineTrash } from "react-icons/hi"
import Pagination from "react-js-pagination"
import 'moment/min/locales.min'



function Bookings() {
    const [bookings, setBookings] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [searchKey, setSearchKey] = useState('')
    const [isUpdatePaymentLoading, setIsUpdatePaymentLoading] = useState(false)
    const toast = useToast()
    const [isDeleted, setIsDeleted] = useState(false)
    const [meta, setMeta] = useState({})

    async function getBookings(pageNumber = 1) {
        setIsLoading(true)
        try {
            const response = await axios.get(`/bookings?page=${pageNumber}&search=${searchKey}`)

            setMeta(response.data.meta)

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
                    'created_at': moment(booking.created_at),
                    'tables': booking.tables,
                    'uuid': booking.uuid,
                    'token': booking.token
                }

                allBookings.push(bookingTemplate)
            })
            setBookings(allBookings)
        } catch (error) {
            setError(true)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getBookings()
    }, [isUpdatePaymentLoading, isDeleted, searchKey])


    // const handleDelete = async (id) => {
    //     setIsDeleted(true)
    //     if (window.confirm('هل انت متأكد من حذف الحجز ؟') == true) {
    //         try {
    //             const response = await axios.delete('/bookings/' + id)
    //             console.log(response.data)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     setIsDeleted(false)
    // }
    
    const handleDelete = async (id, e) => {
        e.stopPropagation()
        setIsDeleted(true)
        if (window.confirm('هل انت متأكد من حذف الحجز ؟') == true) {
            try {
                const response = await axios.delete('/bookings/' + id)
                toast({
                    render: () => (
                        <Alert status={'success'} variant='left-accent' color={'black'}>
                            <AlertIcon />
                            <div className="ps-5 pe-3 fs-7">
                                {'تم حذف الحجز بنجاح'}
                            </div>

                            <CloseButton position={'absolute'} left={'2'} onClick={() => toast.closeAll()} />
                        </Alert>

                    ),
                    duration: 5000,
                    position: 'top-left',
                })
            } catch (error) {
                console.log(error)
                toast({
                    render: () => (
                        <Alert status={'error'} variant='left-accent' color={'black'}>
                            <AlertIcon />
                            <div className="ps-5 pe-3 fs-7">
                                {'حصل خطأ ما'}
                            </div>

                            <CloseButton position={'absolute'} left={'2'} onClick={() => toast.closeAll()} />
                        </Alert>

                    ),
                    duration: 5000,
                    position: 'top-left',
                })
            }
        }
        setIsDeleted(false)
    }

    async function updatePaymentStatus() {
        setIsUpdatePaymentLoading(true)
        try {
            const response = await axios.get('/update_payment_status')
            setIsUpdatePaymentLoading(false)
            toast({
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
            toast({
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

    const noPropagation = e => e.stopPropagation()

    const navigate = useNavigate()
    
    const handleRowClick = (id)=> {
        navigate(`/dashboard/bookings/${id}`)
    }

    
    return (
        <>
            <AuthProvider>
                <DashboardLayout>
                    <div className="dashboard-content">
                        <div className="fs-3 mb-5">قائمة الحجوزات</div>
                        <div className="d-flex justify-content-between">
                            <SearchField onChange={(e) => setSearchKey(e.target.value)} placeholder="ابحث برقم الحجز أو رقم هاتف العميل أو اسم الفنان" />
                            {/* <Tooltip className="din-next" hasArrow label='يتحقق الزر من الحجوزات المعلّقة والتي مر عليها اكثر من 5 دقائق لإلغائها' bg='#F3EEE9' color='black' padding={4} placement='right-end'> */}

                                <button className="btn btn-transparent border-prime fs-6 w-25" onClick={updatePaymentStatus} disabled={isUpdatePaymentLoading}>
                                    {
                                        isUpdatePaymentLoading ?
                                            <i className="fas fa-spinner fa-spin"></i>
                                            : <span>التحقق من الحجوزات المعلّقة</span>
                                    }
                                </button>
                            {/* </Tooltip> */}
                        </div>

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
                                                <th>#</th>
                                                <th className="p-3 fs-7">رقم الحجز</th>
                                                <th className="p-3 fs-7">العميل والحفلة</th>
                                                <th className="p-3 fs-7">حالة الدفع</th>
                                                <th className="p-3 fs-7">الطاولات</th>
                                                <th className="p-3 fs-7">الاجمالي</th>
                                                <th className="p-3 fs-7">مضى عليه</th>
                                                <th className="p-3 fs-7">التذكرة</th>
                                                <th className="p-3 fs-7">خيارات</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                bookings.length === 0 ?
                                                    <div className="text-center text-muted">
                                                        لا توجد حجوزات
                                                    </div> :
                                                    bookings.map((booking, index) => (

                                                        <tr key={booking.id} role={'button'} onClick={()=> handleRowClick(booking.id)} className="table-card fs-7">
                                                            <td>{meta.from + (index)}</td>
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
                                                                    booking.tables.map((table, index) => (
                                                                        table.number + (booking.tables.length - 1 != index && '|')
                                                                    ))
                                                                }
                                                            </td>
                                                            <td>{booking.total_price} ر.س</td>
                                                            <td>{booking.created_at.locale('ar').fromNow('false')}</td>
                                                            <td>
                                                                {
                                                                    booking.payment == 'paid' &&
                                                                    <Link className='text-primary' target={"_blank"} to={`/bookings/${booking.uuid}?token=${booking.token}`} onClick={noPropagation}>
                                                                        التذكرة
                                                                    </Link>
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    booking.payment != 'paid' &&
                                                                    <button className="text-danger" onClick={(e) => handleDelete(booking.id, e)}>
                                                                        <HiOutlineTrash size={20} />
                                                                    </button>
                                                                }
                                                            </td>
                                                        </tr>
                                                    ))}
                                        </tbody>
                                    </table>
                                }

                            </div>

                            {
                                (!isLoading && !error) &&
                                <div className="mt-4">
                                    <Pagination
                                        activePage={meta.current_page}
                                        totalItemsCount={meta.total ? meta.total : 0}
                                        itemsCountPerPage={meta.per_page}
                                        onChange={(pageNumber) => getBookings(pageNumber)}
                                        itemClass="c-page-item"
                                        linkClass="c-page-link"
                                        activeClass="c-active"
                                        firstPageText={'First'}
                                        lastPageText={'Last'}
                                        linkClassLast={'c-page-link-last'}
                                        linkClassFirst={'c-page-link-last'}
                                        hideDisabled={true}
                                        pageRangeDisplayed={6}
                                    // hideNavigation={true}
                                    />
                                </div>
                            }

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