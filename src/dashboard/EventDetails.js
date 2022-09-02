import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import moment from "moment"
import { useDisclosure } from '@chakra-ui/react'
import four_seats from '../assets/images/4seats.png'
import three_seats from '../assets/images/3seats.png'
import two_seats from '../assets/images/2seats.png'
// import { useForm } from "react-hook-form"
// import * as yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup'
// import axios from 'axios'
import axios from '../axios'
import {
    useToast
} from '@chakra-ui/react'
import DashboardLayout from "./DashboardLayout"

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

                const event = {
                    'id': data.id,
                    'date': date.format('YYYY-MM-DD'),
                    'start_time': start_time.format('hh:mm'),
                    'end_time': end_time.format('hh:mm'),
                    'singer_name': data.singer_name,
                    'singer_img': data.singer_img,
                    'price': data.price,
                    'description': data.description,
                    'bookings': data.bookings,
                    'unavailableTables': data.unavailableTables,
                    'is_visible': data.is_visible
                }

                setEvent(event)
                setIsVisible(event.is_visible)
                setBookings(event.bookings)
                setUnavailableTables(event.unavailableTables)
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

    async function handleHideTables() {
        setIsHideLoading(true)
        try {
            const response = await axios.post('/events/' + id + '/hide_tables', { ids: selectedTables, removed_ids: removedTables })
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
        setIsHideLoading(false)
    }


    return (
        <>
            <DashboardLayout>
                <div className="d-flex justify-content-around">
                    <div className="dashboard-event-info p-5 col-4">
                        <div className="mb-4 fs-4">#{event.id}</div>
                        <div className="mb-4">
                            <div className="mb-3 fs-5">{event.singer_name}</div>
                            <div className="mb-2 fs-6">التاريخ: {event.date}</div>
                            <div className="mb-2 fs-6">التوقيت: {event.start_time} إلى {event.end_time}</div>
                            <div className="fs-6">السعر: {event.price} ر.س</div>
                        </div>
                        <div>
                            {/* <button className="btn dashboard-event-info-btn" onClick={() => updateVisibilty(event.id)}>
                                {
                                    isVisible ?
                                        <AiOutlineEye size={25} className="mx-auto" /> :
                                        <AiOutlineEyeInvisible size={25} className="mx-auto" />
                                }
                            </button> */}
                            {/* <button className="btn dashboard-event-info-btn text-danger">حذف الحفلة</button> */}
                            <button onClick={handleHideTables} className="btn dashboard-event-save-btn text-white" disabled={isHideLoading}>
                                {
                                    isHideLoading ?
                                        <i className="fas fa-spinner fa-spin"></i> :
                                        <div>حفظ التعديلات</div>
                                }
                            </button>
                        </div>
                    </div>
                    <div className="dashboard-event-tables p-5">

                        {
                            tablesLoading ?
                                <i className="fas fa-spinner fa-spin"></i> :
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
                                                        <img className="seat-img-dashboard" src={table.img} width={'80%'} alt="" />
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

                    </div>
                </div>
            </DashboardLayout>

            <div className="d-lg-none d-block text-prime">
                <div className="dashboard-event-info p-5 m-3">
                    <div className="mb-4 fs-4">#{event.id}</div>
                    <div className="mb-4">
                        <div className="mb-4 fs-4">{event.singer_name}</div>
                        <div className="mb-3 fs-6">التاريخ: {event.date}</div>
                        <div className="mb-3 fs-6">التوقيت: {event.start_time} إلى {event.end_time}</div>
                        <div className="fs-6">السعر: {event.price} ر.س</div>
                    </div>
                    <div>
                        {/* <button className="btn dashboard-event-info-btn" onClick={() => updateVisibilty(event.id)}>
                            {
                                isVisible ?
                                    <AiOutlineEye size={25} className="mx-auto" /> :
                                    <AiOutlineEyeInvisible size={25} className="mx-auto" />
                            }
                        </button> */}
                        {/* <button className="btn dashboard-event-info-btn text-danger">حذف الحفلة</button> */}

                    </div>
                </div>
                <div className="dashboard-event-tables p-4 m-3">

                    {
                        tablesLoading ?
                            <i className="fas fa-spinner fa-spin"></i> :
                            <div className="position-relative">
                                <div className="grid-container" dir="ltr">
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

                                                        `}
                                                >
                                                    <img className="seat-img" src={table.img} width={'60%'} alt="" />
                                                    <div className="seat-id-dashboard">{table.number}</div>
                                                </div> :
                                                <div key={index}></div>
                                        ))
                                    }
                                </div>
                                <div className="stage">
                                    المسرح
                                </div>
                                <div className="entry">
                                    المدخل
                                </div>
                            </div>
                    }

                    <button onClick={handleHideTables} className="btn dashboard-event-save-btn text-white" disabled={isHideLoading}>
                        {
                            isHideLoading ?
                                <i className="fas fa-spinner fa-spin"></i> :
                                <div>حفظ التعديلات</div>
                        }
                    </button>

                </div>
            </div>
        </>
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