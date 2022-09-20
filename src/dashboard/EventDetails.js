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

const schema = yup.object().shape({
    'singer_name': yup.string().required(),
    'singer_img': yup.string().required(),
    'date': yup.string().required(),
    'start_time': yup.string().required(),
    'end_time': yup.string().required(),
    'price': yup.number().required()
})

function EventDetails() {
    const { id } = useParams()

    const [tables, setTables] = useState([])
    const [event, setEvent] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [bookings, setBookings] = useState([])
    const [unavailableTables, setUnavailableTables] = useState([])
    const [selectedTables, setSelectedTables] = useState([])
    const [removedTables, setRemovedTables] = useState([])
    const [tablesLoading, setTablesLoading] = useState(true)
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const toast = useToast()
    const [isHideLoading, setIsHideLoading] = useState(false)
    const [isPostEventLoading, setIsPostEventLoading] = useState(false)



    const { register, handleSubmit, formState: { errors, dirtyFields, isDirty }, setValue } = useForm(
        {
            resolver: yupResolver(schema)
        }
    )

    // const [isBookingLoading, setIsBookingLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    // get event
    useEffect(() => {
        async function getEvent() {
            try {
                const response = await axios.get('/events/' + id)

                const data = response.data.data

                const date = moment(data.date)
                const start_time = moment(data.start_time)
                const end_time = moment(data.end_time)

                if (end_time.isBefore(start_time))
                    end_time.add(1, 'day')

                const eventTemplate = {
                    'id': data.id,
                    'date': date.format('YYYY-MM-DD'),
                    'start_time': start_time.format('HH:mm'),
                    'end_time': end_time.format('HH:mm'),
                    'singer_name': data.singer_name,
                    'singer_img': data.singer_img,
                    'price': data.price,
                    'description': data.description,
                    'bookings': data.bookings,
                    'unavailableTables': data.unavailableTables,
                    'is_visible': data.is_visible
                }

                setValue('singer_name', eventTemplate.singer_name)
                setValue('singer_img', eventTemplate.singer_img)
                setValue('date', eventTemplate.date)
                setValue('start_time', eventTemplate.start_time)
                setValue('end_time', eventTemplate.end_time)
                setValue('description', eventTemplate.description)
                setValue('price', eventTemplate.price)



                setEvent(eventTemplate)
                setIsVisible(eventTemplate.is_visible)
                setBookings(eventTemplate.bookings)
                setUnavailableTables(eventTemplate.unavailableTables)
            } catch (error) {
                if (error.response.status == 404)
                    navigate('/not-found')
                setError(true)
            }
            setIsLoading(false)
        }
        getEvent()
    }, [id, isHideLoading])


    // get tables
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
                        data[count]['is_hidden'] = false
                        data[count]['selected'] = false
                        if (data[count]['capacity'] == 2) {
                            data[count]['img'] = two_seats
                        } else if (data[count]['capacity'] == 3) {
                            data[count]['img'] = three_seats
                        } else if (data[count]['capacity'] == 4) {
                            data[count]['img'] = four_seats
                        }
                        bookings.forEach(booking => {
                            booking.tables.forEach(table => {
                                if (data[count].id == table.id) {
                                    data[count]['is_available'] = false
                                    return
                                }
                            });
                        })

                        unavailableTables.forEach(unavailableTable => {
                            if (data[count].id == unavailableTable.id) {
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
                setError(true)
            }

        }
        getTables()

        setTimeout(() => {
            setTablesLoading(false)
        }, 3000)
    }, [event])

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
                if (table.selected && !table.is_hidden)
                    selectedTs.push(table.id)
                if (table.selected && table.is_hidden)
                    removedTs.push(table.id)
            }
        })
        setSelectedTables(selectedTs)
        setRemovedTables(removedTs)
    }

    useEffect(() => {
        document.body.style.backgroundColor = '#ffffff'
    }, [])


    // async function updateVisibilty(event_id) {
    //     setIsVisible((current)=> !current)
    //     try {
    //         const response = await axios.patch('/events/' + event_id + '/update_visibility')
    //         console.log(response.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const handleLogout = () => {
        logout()
        navigate('/dashboard/login')
    }

    async function handleHideTables() {
        setIsHideLoading(true)
        try {
            const response = await axios.post('/events/' + id + '/hide_tables', { ids: selectedTables, removed_ids: removedTables })
            successToast()
        } catch (error) {
            console.log(error)
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
                errorToast()
            }
        }
        setIsHideLoading(false)
    }

    const successToast = () => {
        toast({
            render: () => (
                <Alert status={'success'} variant='left-accent' color={'black'}>
                    <AlertIcon />
                    <div className="ps-5 pe-3 fs-7">
                        {'تم التعديل بنجاح'}
                    </div>

                    <CloseButton onClick={() => toast.closeAll()} />
                </Alert>

            ),
            duration: 20000,
            position: 'top-left',
        })
    }

    const errorToast = () => {
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

    function dirtyValues(dirtyFields, allValues) {
        // If *any* item in an array was modified, the entire array must be submitted, because there's no way to indicate
        // "placeholders" for unchanged elements. `dirtyFields` is `true` for leaves.
        if (dirtyFields === true || Array.isArray(dirtyFields))
            return allValues;
        // Here, we have an object
        return Object.fromEntries(Object.keys(dirtyFields).map(key => [key, dirtyValues(dirtyFields[key], allValues[key])]));
    }

    const onSubmit = async (data) => {
        setIsPostEventLoading(true)

        const body = {
            'date': data.date,
            'start_time': data.start_time,
            'end_time': data.end_time,
            'singer_name': data.singer_name,
            'singer_img': data.singer_img,
            'price': data.price,
            'description': data.description
        }

        if (Object.keys(dirtyFields).length) {
            try {
                const response = await axios.put(`/events/${id}`, dirtyValues(dirtyFields, body))
                console.log(response.data)
                successToast()
            } catch (error) {
                errorToast()
            }
        }
        setIsPostEventLoading(false)
    }

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
            <Dashboard>
                <div>
                    <div className='pt-5 px-5 bg-white d-lg-none'>
                        <div className='d-flex justify-content-between'>
                            <div className='dashboard-title-mobile'>
                                معلومات الحفلة
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
                                    <div className="mb-4 fs-2">{event.id}#</div>
                                    <div className="mb-4">
                                        <form onSubmit={handleSubmit(onSubmit)} className="add-event-form">
                                            <input
                                                {...register('singer_name')}
                                                id='singer_name' type={"text"} className={`form-control mb-3 ${errors.singer_name && 'error-border'}`} disabled={isLoading} />
                                            {errors.singer_name && <p className='error-message'>اسم الفنان مطلوب</p>}

                                            <input
                                                {...register('date')}
                                                name='date' id='date' type={'date'} className={`form-control mb-3 ${errors.date && 'error-border'}`} disabled={isLoading} />
                                            {errors.date && <p className='error-message'>التاريخ مطلوب</p>}

                                            <input
                                                {...register('start_time')}
                                                name='start_time' id='start_time' type={'time'} className={`form-control mb-3 ${errors.start_time && 'error-border'}`} disabled={isLoading} />
                                            {errors.start_time && <p className='error-message'>وقت البداية مطلوب</p>}

                                            <input
                                                {...register('end_time')}
                                                name='end_time' id='end_time' type={'time'} className={`form-control mb-3 ${errors.end_time && 'error-border'}`} disabled={isLoading} />
                                            {errors.end_time && <p className='error-message'>وقت النهاية مطلوب</p>}

                                            <textarea {...register('description')} className="form-control mb-3" name="description" id="description" cols="5" rows="3" disabled={isLoading}></textarea>

                                            <input
                                                {...register('singer_img')}
                                                name='singer_img' id='singer_img' type={'url'} className={`form-control mb-3 ${errors.singer_img && 'error-border'}`} disabled={isLoading} dir="ltr" />
                                            {errors.singer_img && <p className='error-message'>{errors.singer_img.message}</p>}

                                            <input
                                                {...register('price')}
                                                name='price' id='price' type={'number'} className={`form-control mb-3 ${errors.price && 'error-border'}`} disabled={isLoading} dir="ltr" />
                                            {errors.price && <p className='error-message'>السعر مطلوب</p>}

                                            <div className="mt-4">
                                                <button
                                                    className="btn hero-btn-primary"
                                                    disabled={isPostEventLoading || !Object.keys(dirtyFields).length}
                                                >

                                                    {isPostEventLoading ?
                                                        <i className="fas fa-spinner fa-spin"></i> :
                                                        <span>حفظ التعديلات</span>
                                                    }
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="dashboard-event-tables p-lg-5 p-1">
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
                                    <button onClick={handleHideTables} className="btn dashboard-event-save-btn text-white" disabled={isHideLoading || !selectedTables.length && !removedTables.length}>
                                        {
                                            isHideLoading ?
                                                <i className="fas fa-spinner fa-spin"></i> :
                                                <div>حفظ التعديلات</div>
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Dashboard>



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

// <div className="">
//     {
//         isLoading &&
//         <div className="container col-lg-8 mt-5 text-center">
//             <i className="fas fa-spinner fa-spin fs-1"></i>
//         </div>
//     }
//     {
//         error &&
//         <div className="container col-lg-8 mt-5 text-center text-second">
//             حصل خطأ ما, تأكد من اتصالك بالانترنت.
//         </div>
//     }

//     {
//         (!isLoading && !error) &&
//         <div className="col-lg-5 col-12 container-lg">
//             {/* <div>
//             <div className="background-secondary px-5 py-4 fs-4 d-flex justify-content-between align-items-center" style={{
//                 cursor: 'pointer'
//             }} onClick={onToggleEventSummary}>
//                 <div>
//                     ملخص الحفلة
//                 </div>
//                 <BsChevronDown className={`arrow ${isEventSummaryOpen && 'down-arrow'}`} />
//             </div> */}
//             {/* <Collapse in={isEventSummaryOpen} animateOpacity> */}
//             <Box className="background-secondary p-5 event-summary">
//                 {/* <img src={event.singer_img} alt="singer_img" /> */}
//                 <div className="mt-4 fs-3">{event.singer_name}</div>
//                 <div className="mt-3 fs-5">التاريخ: {event.date}</div>
//                 <div className="mt-2 fs-5">التوقيت: {event.start_time} - {event.end_time}</div>
//                 {/* <div className="mt-5 fs-5">{event.description}</div> */}
//             </Box>
//             {/* </Collapse>
//         </div> */}
//             {/* <div className="mt-4">
//             <div className="background-secondary px-5 py-4 fs-4 d-flex justify-content-between align-items-center" style={{
//                 cursor: 'pointer'
//             }} onClick={onToggleBookingDetails}>
//                 <div>
//                     تفاصيل الحجز
//                 </div>
//                 <BsChevronDown className={`arrow ${isBookingDetailsOpen && 'down-arrow'}`} />
//             </div>
// <Collapse in={isBookingDetailsOpen} animateOpacity> */}
// <Box className="background-secondary p-5">
//     {
//         tablesLoading || isLoading ?
//             <i className="fas fa-spinner fa-spin fs-4"></i>
//             : <div>
//                 <div className="position-relative">
//                     <div className="grid-container" dir="ltr">
//                         {
//                             tables.map((table, index) => (
//                                 table ?
//                                     <div
//                                         key={'number:' + table.number}
//                                         onClick={() => table.is_available && toggleSelectedTable(index)} className={`
//                                 text-prime 
//                                 grid-item
//                                 position-relative 
//                                 ${table.selected && 'selected-grid'}
//                                 ${!table.is_available && 'grid-item-disabled'}`}
//                                     >
//                                         <img className="seat-img" src={table.img} width={'60%'} alt="" />
//                                         <div className="seat-id">{table.number}</div>
//                                     </div> :
//                                     <div key={index}></div>
//                             ))
//                         }
//                     </div>
//                     <div className="stage">
//                         المسرح
//                     </div>
//                     <div className="entry">
//                         المدخل
//                     </div>
//                 </div>
//                 <div className="container w-75 mt-5">
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                         <div className="booking-details-label fs-5">عدد المقاعد</div>
//                         <div className="booking-details-value">{totalCapacity} <span className="fs-7">مقعد</span></div>
//                     </div>
//                     <div className="d-flex justify-content-between align-items-center">
//                         <div className="booking-details-label fs-5">الإجمالي</div>
//                         <div className="booking-details-value">{totalPrice} <span className="fs-7">ر.س</span></div>
//                     </div>
//                 </div>
//             </div>
//     }
// </Box>
// {/* </Collapse> */}
//             {/* </div> */}
//         </div>

//     }
// </div>
export default EventDetails