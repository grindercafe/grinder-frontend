import { useNavigate, useParams, Link, useMatch, useResolvedPath, useLocation } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import moment from "moment"
import four_seats from '../assets/images/4seats.png'
import three_seats from '../assets/images/3seats.png'
import two_seats from '../assets/images/2seats.png'
import axios from '../axios'
import {
    CloseButton,
    useToast,
    Alert,
    AlertIcon,
    Skeleton
} from '@chakra-ui/react'
import DashboardLayout from "./DashboardLayout"
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Dashboard from './Dashboard'
import { logout } from '../Auth'
import logo from '../assets/images/black-logo.png'
import MobileSidebar from './mobile/MobileSidebar'
import { HiOutlineMenuAlt2 } from "react-icons/hi"

function BookingDetails() {
    const { id } = useParams()
    const [tables, setTables] = useState([])
    const [unavailableTables, setUnavailableTables] = useState([])
    const [selectedTables, setSelectedTables] = useState([])
    const [removedTables, setRemovedTables] = useState([])
    const [tablesLoading, setTablesLoading] = useState(true)
    const navigate = useNavigate()
    const toast = useToast()
    const [isUpdateTablesLoading, setIsUpdateTablesLoading] = useState(false)
    const [isUpdateBookingLoading, setIsUpdateBookingLoading] = useState(false)



    const { register, handleSubmit, formState: { errors, dirtyFields, isDirty }, setValue } = useForm(
        // {
        //     resolver: yupResolver(schema)
        // }
    )

    const [booking, setBooking] = useState({})
    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isEventsLoading, setIsEventsLoading] = useState(true)

    const paymentStatus = ['paid', 'cancelled']


    useEffect(() => {
        async function getBooking() {
            try {
                const response = await axios.get(`/bookings/dashboard/${id}`)

                const data = response.data.data

                const bookingTemplate = {
                    'id': data.id,
                    'event': {
                        'id': data.event?.id,
                        'singer_name': data.event?.singer_name,
                        'bookings': data.event?.bookings,
                        'unavailableTables': data.event?.unavailableTables
                    },
                    'customer': {
                        'name': data.customer?.name,
                        'phone_number': data.customer?.phone_number
                    },
                    'payment': {
                        'status': data.payment?.status
                    },
                    'tables': data.tables,
                    'total_price': data.total_price
                }
                setBooking(bookingTemplate)
            } catch (error) {
                console.log(error)
            }
            setIsLoading(false)
        }
        getBooking()
    }, [id, isUpdateTablesLoading])

    useEffect(() => {
        async function getEvents() {
            try {
                const response = await axios.get('/allEvents')
                setEvents(response.data.data)
            } catch (error) {
                console.log(error)
            }
            setIsEventsLoading(false)
        }
        getEvents()
    }, [])

    useEffect(() => {
        async function getTables() {
            try {
                const response = await axios.get('/tables')
                const data = response.data
                const t = []


                let count = 0
                for (let index = 0; index < 72; index++) {
                    if (!isEmptyPlace(index)) {
                        data[count]['is_available'] = true
                        data[count]['bookedByMe'] = false
                        data[count]['is_hidden'] = false
                        data[count]['selected'] = false

                        if (data[count]['capacity'] == 2) {
                            data[count]['img'] = two_seats
                        } else if (data[count]['capacity'] == 3) {
                            data[count]['img'] = three_seats
                        } else if (data[count]['capacity'] == 4) {
                            data[count]['img'] = four_seats
                        }
                        // bookings.forEach(booking => {
                        // if(booking.tables) {
                        // let shouldSkip = false
                        // booking.tables.forEach(table => {
                        //     if(shouldSkip)
                        //         return
                        //     if (data[count].id == table.id) {
                        //         data[count]['bookedByMe'] = true
                        //         shouldSkip = true
                        //         return
                        //     }
                        // })

                        booking.tables.every((table) => {
                            if (data[count].id === table.id) {
                                data[count]['bookedByMe'] = true
                                return false
                            }
                            return true
                        })

                        booking.event.bookings.forEach((singleBooking) => {
                            if (booking.id !== singleBooking.id) {
                                singleBooking.tables.forEach(table => {
                                    if (data[count].id === table.id) {
                                        data[count]['is_available'] = false
                                        return
                                    }
                                });
                            }
                        })
                        // }
                        // })

                        booking.event.unavailableTables.forEach(unavailableTable => {
                            if (data[count].id === unavailableTable.id) {
                                data[count]['is_hidden'] = true
                            }
                        })
                        t.push(data[count])
                        count++
                    } else {
                        t.push(null)
                    }
                }
                setTables(t)
            } catch (error) {
                console.log(error)
            }
            setTimeout(() => {
                setTablesLoading(false)
            }, 3000)
        }
        if (!isLoading) {
            getTables()
        }

    }, [booking])

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


    const handleLogout = () => {
        logout()
        navigate('/dashboard/login')
    }

    const isEmptyPlace = (index) => {
        return index === 4 ||
            index === 5 ||
            index === 11 ||
            index === 14 ||
            index === 15 ||
            index === 19 ||
            index === 20 ||
            index === 21 ||
            index === 22 ||
            index === 23 ||
            index === 37 ||
            index === 38 ||
            index === 45 ||
            index === 49 ||
            index === 53 ||
            index === 54 ||
            index === 55 ||
            index === 56 ||
            index === 57 ||
            index === 61 ||
            index === 62 ||
            index === 63 ||
            index === 64 ||
            index === 65 ||
            index === 69 ||
            index === 70 ||
            index === 71
    }

    const toggleSelectedTable = (idx) => {
        const ts = [...tables]
        ts[idx].selected = !ts[idx].selected
        setTables(ts)

        selectedTs()
    }

    const selectedTs = () => {
        const selectedTs = []
        const removedTs = []
        tables.map((table) => {
            if (table) {
                if (table.selected && !table.bookedByMe)
                    selectedTs.push(table.id)
                if (table.selected && table.bookedByMe)
                    removedTs.push(table.id)
            }
        })
        setSelectedTables(selectedTs)
        setRemovedTables(removedTs)
    }

    useEffect(() => {
        document.body.style.backgroundColor = '#ffffff'
    }, [])

    async function handleUpdateTables() {
        setIsUpdateTablesLoading(true)
        try {
            const response = await axios.put(`/bookings/${id}/updateTables`,
                { ids: selectedTables, removed_ids: removedTables })
            console.log(response.data)
            toast({
                render: () => (
                    <Alert status={'success'} variant='left-accent' color={'black'}>
                        <AlertIcon />
                        <div className="ps-5 pe-3 fs-7">
                            {'تم تعديل الطاولات والسعر الاجمالي بنجاح'}
                        </div>

                        <CloseButton onClick={() => toast.closeAll()} />
                    </Alert>

                ),
                duration: 20000,
                position: 'top-left',
            })
        } catch (error) {
            console.log(error.response);
            if (error.response.data.message == 'overlapping') {
                toast({
                    render: () => (
                        <Alert status={'error'} variant='left-accent' color={'black'}>
                            <AlertIcon />
                            <div className="ps-5 pe-3 fs-7">
                                {'أحد الطاولات محجوزة مسبقا'}
                            </div>

                            <CloseButton onClick={() => toast.closeAll()} />
                        </Alert>

                    ),
                    duration: 9000,
                    position: 'top-left',
                })
            } else {
                toast({
                    render: () => (
                        <Alert status={'error'} variant='left-accent' color={'black'}>
                            <AlertIcon />
                            <div className="ps-5 pe-3 fs-7">
                                {'حصل خطأ ما, حاول مجدداً لاحقاً'}
                            </div>

                            <CloseButton onClick={() => toast.closeAll()} />
                        </Alert>

                    ),
                    duration: 5000,
                    position: 'top-left',
                })
            }

        }
        setSelectedTables([])
        setRemovedTables([])
        setIsUpdateTablesLoading(false)
    }

    function dirtyValues(dirtyFields, allValues) {
        // If *any* item in an array was modified, the entire array must be submitted, because there's no way to indicate
        // "placeholders" for unchanged elements. `dirtyFields` is `true` for leaves.
        if (dirtyFields === true || Array.isArray(dirtyFields))
            return allValues;
        // Here, we have an object
        return Object.fromEntries(Object.keys(dirtyFields).map(key => [key, dirtyValues(dirtyFields[key], allValues[key])]));
    }

    const onSubmit = async (data) => {
        setIsUpdateBookingLoading(true)

        if (dirtyFields.event) {
            try {
                const response = await axios.put(`/update_event_in_booking/${id}`,
                    dirtyValues(dirtyFields.event, { 'event': data.event }))

                toast({
                    render: () => (
                        <Alert status={'success'} variant='left-accent' color={'black'}>
                            <AlertIcon />
                            <div className="ps-5 pe-3 fs-7">
                                {'تم تعديل الحفلة بنجاح'}
                            </div>

                            <CloseButton onClick={() => toast.closeAll()} />
                        </Alert>

                    ),
                    duration: 20000,
                    position: 'top-left',
                })
            } catch (error) {
                if (error.response.data.message == 'overlapping') {
                    toast({
                        render: () => (
                            <Alert status={'error'} variant='left-accent' color={'black'}>
                                <AlertIcon />
                                <div className="ps-5 pe-3 fs-7">
                                    {`الطاولة (${error.response.data.tables}) محجوزة في الحفلة الاخرى`}
                                </div>

                                <CloseButton onClick={() => toast.closeAll()} />
                            </Alert>

                        ),
                        duration: 9000,
                        position: 'top-left',
                    })
                } else {
                    toast({
                        render: () => (
                            <Alert status={'error'} variant='left-accent' color={'black'}>
                                <AlertIcon />
                                <div className="ps-5 pe-3 fs-7">
                                    {'حصل خطأ ما, حاول مجدداً لاحقاً'}
                                </div>

                                <CloseButton onClick={() => toast.closeAll()} />
                            </Alert>

                        ),
                        duration: 5000,
                        position: 'top-left',
                    })
                }

            }
        }

        if (dirtyFields.paymentStatus) {
            try {
                const response = await axios.put(`/update_payment_status_in_booking/${id}`,
                    dirtyValues(dirtyFields.paymentStatus, { 'paymentStatus': data.paymentStatus }))

                toast({
                    render: () => (
                        <Alert status={'success'} variant='left-accent' color={'black'}>
                            <AlertIcon />
                            <div className="ps-5 pe-3 fs-7">
                                {'تم تعديل حالة الدفع بنجاح'}
                            </div>

                            <CloseButton onClick={() => toast.closeAll()} />
                        </Alert>

                    ),
                    duration: 20000,
                    position: 'top-left',
                })
            } catch (error) {
                toast({
                    render: () => (
                        <Alert status={'error'} variant='left-accent' color={'black'}>
                            <AlertIcon />
                            <div className="ps-5 pe-3 fs-7">
                                {'حصل خطأ ما, حاول مجدداً لاحقاً'}
                            </div>

                            <CloseButton onClick={() => toast.closeAll()} />
                        </Alert>

                    ),
                    duration: 5000,
                    position: 'top-left',
                })
            }
        }
        setIsUpdateBookingLoading(false)
    }

    return (
        <>
            {
                !isLoading &&
                <Dashboard>
                    <div className='pt-5 px-5 bg-white d-lg-none'>
                        <div className='d-flex justify-content-between'>
                            <div className='dashboard-title-mobile'>
                                معلومات الحجز
                            </div>
                            <button className="dashboard-menu-btn dashoboard-nav-btn" onClick={toggleNavbar}>
                                <HiOutlineMenuAlt2 size={'2rem'} />
                            </button>
                        </div>
                        <MobileSidebar nav={nav} toggleNavbar={toggleNavbar} />
                    </div>

                    <div className="d-lg-flex">
                        <div className="sidebar d-none d-lg-block">
                            <Link to={'/'}>
                                <img src={logo} alt="logo" className='' />
                            </Link>
                            <ul>
                                <CustomLink to={'/dashboard/events'}>الحفلات</CustomLink>
                                <CustomLink to={'/dashboard/customers'}>العملاء</CustomLink>
                                <CustomLink to={'/dashboard/bookings'}>الحجوزات</CustomLink>
                            </ul>
                            <div>
                                <button onClick={handleLogout} className="text-danger text-decoration-none">تسجيل الخروج</button>
                            </div>
                        </div>
                        <div className='col-lg-8 sidebar-content din-next p-5 p-lg-0'>
                            <div className="d-lg-flex d-block justify-content-around">
                                <div className="dashboard-event-info p-4 col-lg-4 mb-5 mb-lg-0">
                                    <div className="mb-4 fs-2">{booking.id}#</div>
                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <div className="fs-5">العميل</div>
                                            <div>
                                                <div>{booking.customer.name}</div>
                                                <div>{booking.customer.phone_number}</div>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <div className="fs-5">السعر الإجمالي</div>
                                            <div>{booking.total_price} ر.س</div>
                                        </div>
                                        <form onSubmit={handleSubmit(onSubmit)}>


                                            <div className="mb-4">
                                                <div className="fs-5 ms-3 mb-3">الحفلة</div>
                                                <select {...register('event')} className="form-select" name="event" id="event" disabled={isLoading || isEventsLoading}>
                                                    <option>{booking.event.id} - {booking.event.singer_name}</option>
                                                    {
                                                        events.map((event) => {
                                                            if (event.id !== booking.event.id)
                                                                return <option key={event.id} value={event.id}>{event.id} - {event.singer_name}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>

                                            <div className="mb-4">
                                                <div className="fs-5 ms-3 mb-3">حالة الدفع</div>
                                                <select {...register('paymentStatus')} className="form-select" name="paymentStatus" id="paymentStatus" disabled={isLoading}>
                                                    <option>{booking.payment.status}</option>
                                                    {
                                                        paymentStatus.map((status) => {
                                                            if (status !== booking.payment.status)
                                                                return <option key={status} value={status}>{status}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>

                                            <div>
                                                <button
                                                    className="btn hero-btn-primary"
                                                    disabled={isUpdateBookingLoading || !Object.keys(dirtyFields).length}
                                                >

                                                    {isUpdateBookingLoading ?
                                                        <i className="fas fa-spinner fa-spin"></i> :
                                                        <span>حفظ التعديلات</span>
                                                    }
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="dashboard-event-tables p-lg-5 p-1">
                                    <div className="mb-lg-4 mt-lg-0 mb-4 mt-4 d-flex justify-content-between desc-boxes">
                                        <div className="d-flex">
                                            <div className="blue ms-2"></div>
                                            مغلقة بواسطة المسؤول
                                        </div>
                                        <div className="d-flex">
                                            <div className="orange ms-2"></div>
                                            تابعة لهذا الحجز
                                        </div>
                                        <div className="d-flex">
                                            <div className="red ms-2"></div>
                                            محجوزة
                                        </div>
                                    </div>
                                    {
                                        tablesLoading ?
                                            <div className="position-relative">
                                                <div className="grid-container-dashboard-skeleton" dir="ltr">
                                                    {
                                                        [...Array(72)].map((item, index) => (
                                                            !isEmptyPlace(index) ? <div
                                                                key={index}
                                                                className={`
                                                                    text-prime 
                                                                    grid-item-dashboard-skeleton
                                                                    position-relative
                                                                `}>
                                                                <Skeleton />
                                                            </div> : <div></div>
                                                        ))
                                                    }
                                                </div>
                                                <div className="stage-dashboard">
                                                    المسرح
                                                </div>
                                                <div className="entry-dashboard">
                                                    المدخل
                                                </div>
                                            </div>
                                            :
                                            <div className="position-relative">
                                                <div className="grid-container-dashboard" dir="ltr">
                                                    {
                                                        tables.map((table, index) => (
                                                            table ?
                                                                <div
                                                                    key={'number:' + table.number}
                                                                    onClick={() => table.is_available && toggleSelectedTable(index)} className={`
                                                            text-prime
                                                            grid-item-dashboard
                                                            position-relative
                                                            ${table.selected && 'selected-grid-dashboard'}
                                                            ${!table.is_available && 'grid-item-disabled-dashboard'}
                                                            ${table.is_hidden && 'grid-item-hidden-dashboard'}
                                                            ${table.bookedByMe && 'grid-item-bookedByMe-dashboard'}
                                                            `}>
                                                                    <img className="seat-img-dashboard" src={table.img} alt="" />
                                                                    <div className="seat-id-dashboard">{table.number}</div>
                                                                </div> :
                                                                <div key={index}></div>
                                                        ))
                                                    }
                                                </div>
                                                <div className="stage-dashboard">
                                                    المسرح
                                                </div>
                                                <div className="entry-dashboard">
                                                    المدخل
                                                </div>
                                            </div>
                                    }
                                    <button onClick={handleUpdateTables} className="btn dashboard-event-save-btn text-white" disabled={isUpdateTablesLoading || !selectedTables.length && !removedTables.length}>
                                        {
                                            isUpdateTablesLoading ?
                                                <i className="fas fa-spinner fa-spin"></i> :
                                                <div>تعديل الطاولات</div>
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dashboard>
            }
        </>
    )
}

function CustomLink({ to, children }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: false })
    return (
        <li className={isActive ? 'active-index' : ''}>
            <Link to={to} className="dashboard-links">
                {children}
            </Link>
        </li>
    )
}

export default BookingDetails