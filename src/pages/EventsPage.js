import { useEffect, useMemo, useState } from "react"
import axios from '../axios'
import moment from "moment"
import 'bootstrap/dist/js/bootstrap.min.js'
import Layout from "../components/Layout"
import { IoCloseOutline } from "react-icons/io5"
import { SiApplepay } from "react-icons/si"
import { FaCcMastercard, FaCcVisa } from "react-icons/fa"
import { useForm } from 'react-hook-form'
import { Navigate } from "react-router-dom"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useDisclosure,
    useToast,
    Alert,
    AlertIcon,
    CloseButton
} from '@chakra-ui/react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
    'customerName': yup.string().required(),
    'phoneNumber': yup.string().length(10).required()
})


function EventsPage() {

    const [termsAgreed, setTermsAgreed] = useState(false)
    const { isOpen: isTermsAgreementOpen, onOpen: onTermsAgreementOpen, onClose: onTermsAgreementClose } = useDisclosure()

    const handleAgreeButton = () => {
        setTermsAgreed(true)
        onTermsAgreementClose()
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })

    const [redirect, setRedirect] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isPostBookingLoading, setIsPostBookingLoading] = useState(false)

    const handleBookingNowButton = (event_id) => {
        setSelectedEventId(event_id)
        onOpen()
    }

    const handleCloseModal = () => {
        resetForm()
        onClose()
    }

    const resetForm = () => {
        reset()
        setCount(2)
    }

    const onSubmit = async (data) => {
        setIsPostBookingLoading(true)
        const body = {
            'party_size': count,
            'event_id': selectedEventId,
            'customer': {
                'name': data.customerName,
                'phone_number': data.phoneNumber
            }
        }
        try {
            const response = await axios.post('/booking', body)
            console.log(response.data)
            successToast()
        } catch (error) {
            errorToast()
            // if (error.response.data.code === 100)
            //     alert('لا يمكنك حجز اقل من شخصين')
            // else if (error.response.data.code === 101)
            //     alert('تجاوزت العدد المتبقي')
            // else
            //     alert(JSON.stringify(error.response))
        }
        setIsPostBookingLoading(false)
        handleCloseModal()
    }

    const [events, setEvents] = useState([])
    const [eventsError, setEventsError] = useState()
    const [selectedEventId, setSelectedEventId] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const selectedEvent = useMemo(() => events.find(event => event.id === selectedEventId), [selectedEventId, events])

    const [count, setCount] = useState(2)
    const minNumber = 2

    function increaseCounter() {
        setCount((value) => value + 1)
    }

    function decreaseCounter() {
        if (count > minNumber) {
            setCount((value) => value - 1)
        }
    }

    useEffect(() => {
        onTermsAgreementOpen()
        async function getEvents() {
            try {
                const response = await axios.get('/events')

                const all_events = []

                for (const singleEvent of response.data.data) {
                    const data = singleEvent

                    const date = moment(data.date)
                    const start_time = moment(data.start_time)
                    const end_time = moment(data.end_time)

                    if (end_time.isBefore(start_time)) {
                        end_time.add(1, 'day')
                    }

                    const event = {
                        'id': data.id,
                        'date': date.format('DD-MM-YYYY'),
                        'start_time': start_time.format('hh:mmA'),
                        'end_time': end_time.format('hh:mmA'),
                        'singer_name': data.singer_name,
                        'singer_img': data.singer_img,
                        'available_seats': data.available_chairs,
                        'price_per_person': data.price_per_person
                    }

                    all_events.push(event)
                }

                setEvents(all_events)
            } catch (error) {
                setEventsError('لا توجد حفلات الان')
            }

            setIsLoading(false)
        }
        getEvents()
    }, [])

    const toast = useToast()

    const successToast = () => {
        toast({
            render: () => (
                <Alert status={'success'} variant='solid' color={'black'}>
                    <AlertIcon color={'white'} />
                    <div className="ps-5 pe-3 fs-7 text-white">
                        {'تم الحجز بنجاح'}
                    </div>

                    <CloseButton position={'absolute'} left={'2'} color={'white'} onClick={() => toast.closeAll()} />
                </Alert>

            ),
            position: 'top-left',
        })
    }

    const errorToast = () => {
        toast({
            render: () => (
                <Alert status={'error'} variant='solid' color={'black'}>
                    <AlertIcon color={'white'} />
                    <div className="ps-5 pe-3 fs-7 text-white">
                        {'حدث خطأ'}
                    </div>

                    <CloseButton position={'absolute'} left={'2'} color={'white'} onClick={() => toast.closeAll()} />
                </Alert>

            ),
            position: 'top-left',
        })
    }

    return (
        <Layout child={'events'}>
            {isLoading && <div>loading..</div>}
            {redirect && <Navigate to={'/'} replace={true} />}

            {/* Agreement Modal */}
            {
                !termsAgreed &&
                <Modal isOpen={isTermsAgreementOpen} size={'xl'} closeOnOverlayClick={false}>
                    <ModalOverlay backdropFilter='blur(8px)' />
                    <ModalContent className="background-primary">
                        <ModalBody className="background-primary py-4">
                            <div className="frame terms-and-conditions">
                                <div className='text-center fs-3 my-5'>الشروط والأحكام</div>

                                <ul className='px-5'>
                                    <li>الرجاء التأكد من الوقت المختار والوصف قبل اجراء الحجز.</li>
                                    <li>المبالغ المدفوعة غير قابلة للاسترجاع.</li>
                                    <li>لا يمكن إلغاء الحجز</li>
                                    <li>جميع الأسعار تشمل ضريبة تقديم منتجات التبغ 100% بالإضافة الى 15% ضريبة القيمة المضافة.</li>
                                    <li>الرجاء التقيد بالوقت المحدد لأن الطاولة ستكون محجوزة لعملاء آخرين قبل وبعد وقتكم المحدد.</li>
                                    <li>غير مسموح للاطفال ولمن تقل اعمارهم عن 18 سنة بالدخول.</li>
                                </ul>

                                <div className="d-flex justify-content-center">
                                    <button onClick={handleAgreeButton} className='btn btn-secondary w-50 p-3 fs-5 mb-5'>موافق</button>
                                </div>
                            </div>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            }

            <div className="page-title-text">
                قائمة الحفلات
            </div>

            {eventsError && <div className="text-center fs-4">{eventsError}</div>}

            <div className="row row-cols-lg-2 justify-content-center">
                {events.map((event) => (
                    <div key={event.id} className="event-card-mobile">
                        <div className="event-card-frame">
                            <div className="event-card-content">
                                <img src={event.singer_img} alt="singer" />
                                <div className="d-flex justify-content-between my-4">
                                    <div className="ms-4" style={{ fontSize: '23px' }}>{event.singer_name}</div>
                                    <div style={{ fontSize: '20px' }}>{event.price_per_person} ر.س</div>
                                </div>
                                <div className="mb-2 fw-bold" style={{ fontSize: '15px' }}>التاريخ / {event.date}</div>
                                <div className="mb-2 fw-bold" style={{ fontSize: '15px' }}>التوقيت / {event.start_time} إلى {event.end_time}</div>
                                <div className="mb-4 din-next" style={{ fontSize: '15px' }}>يشمل الحجز شيشة وكوب قهوة يشمل الحجز شيشة وكوب قهوة يشمل الحجز شيشة وكوب قهوة يشمل الحجز شيشة وكوب قهوة</div>
                                <button className={'btn btn-secondary p-3 fs-5 w-100'}
                                    // data-bs-toggle="modal" data-bs-target="#makeBooking" 
                                    onClick={() => handleBookingNowButton(event.id)}>احجز الان</button>
                            </div>
                        </div>
                    </div>
                    // <div key={event.id} className="row event-box">
                    //     <div className="col">
                    //         <img src={singer} alt="rabih" height={'300px'} />
                    //     </div>
                    //     <div className="col d-flex flex-column justify-content-between my-5">
                    //         <div style={{ fontSize: '37px' }}>{event.singer_name}</div>
                    //         <div style={{ fontSize: '21px' }}>متوفر</div>
                    //         <div style={{ fontSize: '21px' }}>التوقيت: 9 مساء الى 12 صباحا</div>
                    //         <div style={{ fontSize: '21px' }}>التاريخ: {event.date}</div>
                    //     </div>
                    //     <div className="col d-flex flex-column justify-content-between align-items-end my-5">
                    //         <div style={{ fontSize: '31px' }}>
                    //             {event.price_per_person} ر.س
                    //         </div>
                    //         <div>
                    //             <Button to={'/location'} text='احجز الان' className={'btn btn-secondary'} />
                    //         </div>
                    //     </div>
                    // </div>
                ))}
            </div>


            {/* Payment Modal */}
            <Modal isOpen={isOpen} onClose={onClose} size={'xl'} closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent className="background-primary">
                    <ModalBody className="background-primary py-4">
                        {selectedEvent &&
                            <div className="background-primary text-prime">
                                <div className="booking frame">
                                    <div className="d-flex justify-content-end mb-5">
                                        <button className="nav-btn nav-close-btn"
                                            // data-bs-dismiss="modal"
                                            onClick={handleCloseModal}>
                                            <IoCloseOutline size={'2.2rem'} />
                                        </button>
                                    </div>
                                    {/* image */}
                                    <div className="frame">
                                        <img src={selectedEvent.singer_img} alt="singer" className="booking-singer-img" />
                                    </div>
                                    {/* summary */}
                                    <div className="frame">
                                        <div className="booking-summary">
                                            <div className="title">الملخص</div>
                                            <div>الفنان/ {selectedEvent.singer_name}</div>
                                            <div>التاريخ/ {selectedEvent.date}</div>
                                            <div>التوقيت/ {selectedEvent.start_time} حتى {selectedEvent.end_time}</div>

                                            <div className="d-flex justify-content-between mt-5">
                                                <div>عدد التذاكر</div>
                                                <div>{errors.party_size && 'jhg'}</div>
                                                <div style={{ width: '5rem' }}>
                                                    <div className="d-flex justify-content-between">
                                                        <button className="counter-active" onClick={increaseCounter}>+</button>
                                                        <div
                                                            {...register('party_size')}
                                                            type='number'
                                                            className="d-flex justify-content-center align-items-center fs-5">
                                                            {count}
                                                        </div>
                                                        {/* </input> */}
                                                        <button disabled={count <= minNumber} className={count > minNumber ? 'counter-active' : 'counter'} onClick={decreaseCounter}>-</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-between fs-4 mt-4">
                                                <div>الإجمالي</div>
                                                <div>{selectedEvent.price_per_person * count} ر.س</div>
                                            </div>
                                        </div>
                                    </div>
                                    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                                        {/* customer info */}
                                        <div className="frame">
                                            <div className="booking-customer-form">
                                                <div className="title">معلومات العميل</div>
                                                <label className="mb-2 form-label" htmlFor="customer_name">الاسم *</label>
                                                <input {...register('customerName')} className={`form-control mb-2 p-3 ${errors.customerName && 'error-border'}`} type="text" id="customer_name" placeholder="أدخل الاسم" />
                                                {errors.customerName && <p className="error-message">اسم العميل مطلوب</p>}
                                                <label className="mb-2 form-label mt-4" htmlFor="customer_phone_number">رقم الهاتف *</label>
                                                <input
                                                    {...register('phoneNumber')}
                                                    className={`form-control p-3 ${errors.phoneNumber && 'error-border'}`} placeholder="أدخل رقم الهاتف"
                                                    id="customer_phone_number"
                                                    type="text" />
                                                {errors.phoneNumber && <p className="error-message">رقم الهاتف مطلوب</p>}
                                            </div>
                                        </div>

                                        <div className="frame">
                                            <button type={"submit"} className="btn btn-secondary w-100 p-2 fs-5">

                                                {isPostBookingLoading ?
                                                    <i className="fas fa-spinner fa-spin"></i> :
                                                    <span className="m-5">إحجز</span>
                                                }
                                            </button>
                                        </div>
                                        {/* logos */}
                                        {/* <div className="frame">
                                            <div className="booking-logos">
                                                <div>
                                                    <FaCcVisa size={'3rem'} />
                                                </div>
                                                <div>
                                                    <FaCcMastercard size={'3rem'} />
                                                </div>
                                                <div>
                                                    <SiApplepay size={'3rem'} />
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* payment */}
                                        {/* <div className="frame">
                                            <div className="booking-payment-form">
                                                <div className="title">معلومات الدفع</div>
                                                <input className="form-control mb-4 p-3" type="text" placeholder="Card Number" dir="ltr" />
                                                <div className="d-flex justify-content-between">
                                                    <input className="form-control ms-4 p-3" type="text" placeholder="CVV" dir="ltr"
                                                        style={{ width: '30%' }}
                                                    />
                                                    <input className="form-control p-3" type="text" placeholder="Expiry Date" dir="ltr"
                                                        style={{ width: '70%' }}
                                                    />
                                                </div>
                                                <button type={"submit"} className="btn btn-primary mt-4 w-100 p-2 fs-5">
                                                    إدفع
                                                    {isPostBookingLoading && <i className="mx-4 fas fa-spinner fa-pulse"></i>}
                                                </button>

                                            </div>
                                        </div> */}
                                    </form>
                                </div>
                            </div>
                        }
                    </ModalBody>
                </ModalContent>
            </Modal>

        </Layout>
    )
}

export default EventsPage