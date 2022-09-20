import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import moment from "moment"
import Layout from "../components/Layout"
import { useDisclosure, Collapse, Box, Skeleton } from '@chakra-ui/react'
import four_seats from '../assets/images/4seats.png'
import three_seats from '../assets/images/3seats.png'
import two_seats from '../assets/images/2seats.png'
import { BsChevronDown } from "react-icons/bs"
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// import axios from 'axios'
import axios from '../axios'
import {
    Alert,
    AlertIcon,
    CloseButton,
    useToast
} from '@chakra-ui/react'
import { arabicDays } from "../utils/Helper"

const t = [
    {
        'id': 34,
        'name': 'A100',
        'capacity': 4,
        'available': true
    },
    {
        'id': 34,
        'name': 'B100',
        'capacity': 3,
        'available': true
    },
    {
        'id': 34,
        'name': 'A101',
        'capacity': 4,
        'available': true
    },
    {
        'id': 34,
        'name': 'C100',
        'capacity': 2,
        'available': true
    },
    {},
    {},
    {
        'id': 34,
        'name': 'A102',
        'capacity': 4,
        'available': true
    },
    {
        'id': 34,
        'name': 'A103',
        'capacity': 4,
        'available': true
    },
    {
        'id': 34,
        'name': 'B101',
        'capacity': 3,
        'available': true
    },
    {
        'id': 34,
        'name': 'B102',
        'capacity': 3,
        'available': true
    },
    {
        'id': 34,
        'name': 'C101',
        'capacity': 2,
        'available': true
    },
    {},
    {
        'id': 34,
        'name': 'A104',
        'capacity': 4,
        'available': true
    },
    {
        'id': 34,
        'name': 'A105',
        'capacity': 4,
        'available': true
    },
    {},
    {},
    {
        'id': 34,
        'name': 'B103',
        'capacity': 3,
        'available': true
    },
    {
        'id': 34,
        'name': 'C102',
        'capacity': 2,
        'available': true
    },
    {
        'id': 34,
        'name': 'C103',
        'capacity': 2,
        'available': true
    },
    {
        'id': 34,
        'name': 'C104',
        'capacity': 2,
        'available': true
    },
    {
        'id': 34,
        'name': 'C105',
        'capacity': 2,
        'available': true
    },
    {
        'id': 34,
        'name': 'C106',
        'capacity': 2,
        'available': true
    },
    {
        'id': 34,
        'name': 'C107',
        'capacity': 2,
        'available': true
    },
    {
        'id': 34,
        'name': 'C108',
        'capacity': 2,
        'available': true
    },
    {
        'id': 34,
        'name': 'A106',
        'capacity': 4,
        'available': true
    },
    {
        'id': 34,
        'name': 'B104',
        'capacity': 3,
        'available': true
    },
    {
        'id': 34,
        'name': 'C109',
        'capacity': 2,
        'available': true
    },
    {
        'id': 34,
        'name': 'C110',
        'capacity': 2,
        'available': true
    },
    {
        'id': 34,
        'name': 'C111',
        'capacity': 2,
        'available': true
    },
    {
        'id': 34,
        'name': 'C112',
        'capacity': 2,
        'available': true
    },
    {
        'id': 34,
        'name': 'C113',
        'capacity': 2,
        'available': true
    },
    {
        'id': 34,
        'name': 'C114',
        'capacity': 2,
        'available': true
    },
    {
        'id': 34,
        'name': 'C115',
        'capacity': 2,
        'available': true
    },
    {
        'id': 34,
        'name': 'B105',
        'capacity': 3,
        'available': true
    },
    {},
    {
        'id': 34,
        'name': 'B106',
        'capacity': 3,
        'available': true
    },
    {
        'id': 34,
        'name': 'C116',
        'capacity': 2,
        'available': true
    },
    {
        'id': 34,
        'name': 'C117',
        'capacity': 2,
        'available': true
    },
    {},
    {
        'id': 34,
        'name': 'C118',
        'capacity': 2,
        'available': true
    },
    {
        'id': 34,
        'name': 'B107',
        'capacity': 3,
        'available': true
    },
    {
        'id': 34,
        'name': 'B108',
        'capacity': 3,
        'available': true
    },
    {},
    {
        'id': 34,
        'name': 'C119',
        'capacity': 2,
        'available': true
    },
    {
        'id': 34,
        'name': 'C120',
        'capacity': 2,
        'available': true
    },
    {
        'id': 34,
        'name': 'C121',
        'capacity': 2,
        'available': true
    },
    {},
    {},
    {
        'id': 34,
        'name': 'C122',
        'capacity': 2,
        'available': true
    },
    {},
    {},
    {
        'id': 34,
        'name': 'C123',
        'capacity': 2,
        'available': true
    },
    {
        'id': 34,
        'name': 'C124',
        'capacity': 2,
        'available': true
    },
    {
        'id': 34,
        'name': 'C125',
        'capacity': 2,
        'available': true
    },
    {},
    {},
    {},
    {},
    {},
    {
        'id': 34,
        'name': 'A107',
        'capacity': 4,
        'available': true
    },
    {
        'id': 34,
        'name': 'A108',
        'capacity': 4,
        'available': true
    },
    {
        'id': 34,
        'name': 'A109',
        'capacity': 4,
        'available': true
    },
    {},
    {}
]

const schema = yup.object().shape({
    'customer_name': yup.string().required(),
    'phone_number': yup.string().matches(/^(05)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/).required(),
    'phone_number_confirmation': yup.string().required().oneOf([yup.ref('phone_number'), null])
})

function EventPage() {
    const customer_info = useRef(null)
    const [tables, setTables] = useState([])
    const { id } = useParams()
    const [event, setEvent] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const {
        isOpen: isEventSummaryOpen,
        onToggle: onToggleEventSummary,
        onClose: closeEventSummary,
        onOpen: openEventSummary
    } = useDisclosure()

    const {
        isOpen: isBookingDetailsOpen,
        onToggle: onToggleBookingDetails,
        onClose: closeBookingDetails,
        onOpen: openBookingDetails
    } = useDisclosure({ defaultIsOpen: true })

    const {
        isOpen: isCustomerInfoOpen,
        onToggle: onToggleCustomerInfo,
        onClose: closeCustomerInfo,
        onOpen: openCustomerInfo
    } = useDisclosure()

    const [bookings, setBookings] = useState([])
    const [unavailableTables, setUnavailableTables] = useState([])
    const [selectedTables, setSelectedTables] = useState([])
    const [tablesLoading, setTablesLoading] = useState(true)
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const toast = useToast()

    const [isBookingLoading, setIsBookingLoading] = useState(false)
    // const [isPaymentLoading, setIsPaymentLoading] = useState(false)


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    async function getEvent() {
        try {
            const response = await axios.get('/visible_events/' + id)

            const data = response.data.data

            const date = moment(data.date)
            const start_time = moment(data.start_time)
            const end_time = moment(data.end_time)

            if (end_time.isBefore(start_time))
                end_time.add(1, 'day')

            const event = {
                'date': date,
                'start_time': start_time.format('hh:mm'),
                'end_time': end_time.format('hh:mm'),
                'singer_name': data.singer_name,
                'singer_img': data.singer_img,
                'price': data.price,
                'description': data.description,
                'bookings': data.bookings,
                'unavailableTables': data.unavailableTables
            }

            setEvent(event)
            setBookings(event.bookings)
            setUnavailableTables(event.unavailableTables)
        } catch (error) {
            if (error.response.status == 404)
                navigate('/not-found')
            setError(true)
        }
        setIsLoading(false)
    }

    // get event
    useEffect(() => {
        getEvent()
    }, [id])


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
                                data[count]['is_available'] = false
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
        }, 4000)
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

    const [totalCapacity, setTotalCapacity] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    const toggleSelectedTable = (idx) => {
        const ts = [...tables]
        ts[idx].selected = !ts[idx].selected
        setTables(ts)
        setTotalCapacity((curret) => ts[idx].selected ? curret + ts[idx].capacity : curret - ts[idx].capacity)

        setTotalPrice((prev) =>
            ts[idx].selected ?
                (ts[idx].capacity * event.price) + prev :
                prev - (ts[idx].capacity * event.price)
        )

        selectedTs()
    }

    const selectedTs = () => {
        const selectedTs = []
        tables.map((table) => {
            if (table) {
                if (table.selected)
                    selectedTs.push(table.id)
            }
        })
        setSelectedTables(selectedTs)
    }


    async function onSubmit(data) {

        if (selectedTables.length === 0)
            return toast({
                render: () => (
                    <Alert status={'error'} variant='left-accent' color={'black'}>
                        <AlertIcon />
                        <div className="ps-5 pe-3 fs-7">
                            {'يرجى اختيار طاولة'}
                        </div>

                        <CloseButton onClick={() => toast.closeAll()} />
                    </Alert>

                ),
                duration: 9000,
                position: 'top-left',
            })

        const paymentData = {
            'amount': totalPrice,
            'name': data.customer_name,
            'phone_number': data.phone_number
        }
        setIsBookingLoading(true)
        try {
            const paymentResponse = await axios.post('/payment', paymentData)
            if (paymentResponse.status === 200) {
                try {
                    const body = {
                        'total_price': totalPrice,
                        'event_id': id,
                        'tables': selectedTables,
                        'customer': {
                            'name': data.customer_name,
                            'phone_number': data.phone_number,
                        },
                        'transactionNo': paymentResponse.data.transactionNo,
                    }
                    const bookingReponse = await axios.post('/booking', body)
                    window.location.replace(paymentResponse.data.url)
                } catch (error) {
                    setIsBookingLoading(false)
                    if (error.response.data.message == 'overlapping') {
                        return toast({
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
                    }
                    return toast({
                        render: () => (
                            <Alert status={'error'} variant='left-accent' color={'black'}>
                                <AlertIcon />
                                <div className="ps-5 pe-3 fs-7">
                                    {'حصل خطأ ما, حاول مجدداً لاحقاً'}
                                </div>

                                <CloseButton onClick={() => toast.closeAll()} />
                            </Alert>

                        ),
                        duration: 9000,
                        position: 'top-left',
                    })
                }
            }
        } catch (error) {
            setIsBookingLoading(false)
            return toast({
                render: () => (
                    <Alert status={'error'} variant='left-accent' color={'black'}>
                        <AlertIcon />
                        <div className="ps-5 pe-3 fs-7">
                            {'حصل خطأ ما في جلب صفحة الدفع'}
                        </div>
                        <CloseButton onClick={() => toast.closeAll()} />
                    </Alert>

                ),
                duration: 9000,
                position: 'top-left',
            })
        }

        setIsBookingLoading(false)

    }

    const executeScroll = () => customer_info.current.scrollIntoView()

    const handleNextStep = () => {
        closeBookingDetails()
        openCustomerInfo()
        executeScroll()
    }

    return (
        <Layout>
            {
                isLoading &&
                <div className="container col-lg-8 mt-5 text-center">
                    <i className="fas fa-spinner fa-spin fs-1"></i>
                </div>
            }
            {
                error &&
                <div className="container col-lg-8 mt-5 text-center text-second">
                    حصل خطأ ما, تأكد من اتصالك بالانترنت.
                </div>
            }
            {
                (!isLoading && !error) &&
                <div className="container col-lg-8">
                    <div>
                        <div className="background-secondary px-5 py-4 fs-4 d-flex justify-content-between align-items-center" style={{
                            cursor: 'pointer'
                        }} onClick={onToggleEventSummary}>
                            <div>
                                ملخص الحفلة
                            </div>
                            <BsChevronDown className={`arrow ${isEventSummaryOpen && 'down-arrow'}`} />
                        </div>
                        <Collapse in={isEventSummaryOpen} animateOpacity>
                            <Box className="background-secondary p-5 event-summary">
                                <img src={event.singer_img} alt="singer_img" />
                                <div className="d-flex justify-content-between">
                                    <div className="mt-4 fs-3">{event.singer_name}</div>
                                    <div className="mt-4 fs-4">{event.price} ر.س/للمقعد</div>
                                </div>
                                <div className="mt-3 fs-5">اليوم: {arabicDays(event.date.format('dddd'))}</div>
                                <div className="mt-3 fs-5">التاريخ: {event.date.format('YYYY/MM/DD')}</div>
                                <div className="mt-2 fs-5">التوقيت: {event.start_time} - {event.end_time}</div>
                                <div className="mt-5 fs-5">{event.description}</div>
                            </Box>
                        </Collapse>
                    </div>
                    <div className="mt-4">
                        <div className="background-secondary px-5 py-4 fs-4 d-flex justify-content-between align-items-center" style={{
                            cursor: 'pointer'
                        }} onClick={onToggleBookingDetails}>
                            <div>
                                تفاصيل الحجز
                            </div>
                            <BsChevronDown className={`arrow ${isBookingDetailsOpen && 'down-arrow'}`} />
                        </div>
                        <Collapse in={isBookingDetailsOpen} animateOpacity>
                            <Box className="background-secondary p-4">
                                {
                                    tablesLoading || isLoading ?
                                        // <i className="fas fa-spinner fa-spin fs-4"></i>
                                        <div className="position-relative">
                                            <div className="grid-container" dir="ltr">
                                                {
                                                    [...Array(72)].map((item, index) => (
                                                        !isEmptyPlace(index) ? <div
                                                            key={index}
                                                            className={`
                                                                    text-prime 
                                                                    grid-item-skeleton
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
                                        : <div>
                                            <div className="position-relative">
                                                <div className="grid-container" dir="ltr">
                                                    {
                                                        tables.map((table, index) => (
                                                            table ?
                                                                <div
                                                                    key={'number:' + table.number}
                                                                    onClick={() => table.is_available && toggleSelectedTable(index)} className={`
                                                        text-prime 
                                                        grid-item
                                                        position-relative 
                                                        ${table.selected && 'selected-grid'}
                                                        ${!table.is_available && 'grid-item-disabled'}`}
                                                                >
                                                                    <img className="seat-img" src={table.img} width={'60%'} alt="" />
                                                                    <div className="seat-id">{table.number}</div>
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
                                            <div className="container mt-5">
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    * يتم احتساب السعر الإجمالي بناءً على عدد المقاعد (مقعدين على الأقل)
                                                </div>
                                            </div>
                                            <div className="container w-75 mt-5">
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <div className="booking-details-label fs-5">عدد المقاعد</div>
                                                    <div className="booking-details-value">{totalCapacity} <span className="fs-7">مقعد</span></div>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="booking-details-label fs-5">الإجمالي</div>
                                                    <div className="booking-details-value">{totalPrice} <span className="fs-7">ر.س</span></div>
                                                </div>
                                            </div>
                                            <button onClick={handleNextStep} className="btn btn-secondary w-100 p-2 mt-5 fs-5">
                                                <span>التالي</span>
                                            </button>
                                        </div>
                                }
                            </Box>
                        </Collapse>
                    </div>
                    <div className="mt-4" ref={customer_info}>
                        <div className="background-secondary px-5 py-4 fs-4 d-flex justify-content-between align-items-center" style={{
                            cursor: 'pointer'
                        }} onClick={onToggleCustomerInfo}>
                            <div>
                                معلومات الاتصال
                            </div>
                            <BsChevronDown className={`arrow ${isCustomerInfoOpen && 'down-arrow'}`} />
                        </div>
                        <Collapse in={isCustomerInfoOpen} animateOpacity>
                            <Box className="background-secondary p-4">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div>
                                        <label
                                            className="mb-2 form-label"
                                            htmlFor="customer_name">الاسم *</label>
                                        <input
                                            {...register('customer_name')}
                                            className={`form-control mb-2 p-3 ${errors.customer_name && 'error-border'}`}
                                            type="text"
                                            id="customer_name"
                                            placeholder="أدخل الاسم"
                                        />
                                        {errors.customer_name && <p className="error-message">اسم العميل مطلوب</p>}
                                        <label
                                            className="mb-2 form-label mt-4" htmlFor="customer_phone_number">رقم الهاتف *</label>
                                        <input
                                            {...register('phone_number')}
                                            className={`form-control p-3 ${errors.phone_number && 'error-border'}`}
                                            placeholder="Ex: 05xxxxxxxx"
                                            id="customer_phone_number"
                                            type="text"
                                            dir="ltr"
                                        />
                                        {errors.phone_number && <p className="error-message mt-2">يجب ان يكون رقم الهاتف صالح</p>}

                                        <label
                                            className="mb-2 form-label mt-4" htmlFor="customer_phone_number_confirmation">تأكيد رقم الهاتف *</label>
                                        <input
                                            {...register('phone_number_confirmation')}
                                            className={`form-control p-3 
                                        ${errors.phone_number_confirmation && 'error-border'}`}
                                            placeholder="Ex: 05xxxxxxxx"
                                            id="phone_number_confirmation"
                                            type="text"
                                            dir="ltr"
                                        />
                                        {errors.phone_number_confirmation && <p className="error-message mt-2">يجب ان تتطابق الارقام</p>}

                                    </div>
                                    <button
                                        className="btn btn-primary w-100 p-2 mt-5 fs-5" disabled={isBookingLoading}>
                                        {isBookingLoading ?
                                            <i className="fas fa-spinner fa-spin"></i> :
                                            <span>الإستمرار للدفع</span>
                                        }
                                    </button>
                                </form>
                            </Box>
                        </Collapse>
                    </div>
                </div>

            }
        </Layout>
    )
}

export default EventPage